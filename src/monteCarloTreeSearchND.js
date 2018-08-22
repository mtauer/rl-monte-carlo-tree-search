/* eslint-disable no-param-reassign */
import isEmpty from 'lodash/isEmpty';
import sample from 'lodash/sample';
import maxBy from 'lodash/maxBy';
import first from 'lodash/first';
import repeat from 'lodash/repeat';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';

const options = {
  learningTimeInMs: 100,
  ucb1ExplorationParameter: Math.sqrt(2), // originally it's Math.sqrt(2)
  ucb1WithMinMax: false,
};

export default function monteCarloTreeSearchND(game, state, initialRoot) {
  if (game.isFinished(state)) { return null; }

  const startTime = performance.now();
  let root;
  if (initialRoot) {
    root = initialRoot;
  } else {
    root = new MonteCarloTreeSearchNode(null);
    root.setChildren(getNewNodes(game, state));
  }
  while ((performance.now() - startTime) < options.learningTimeInMs) {
    let currentNodeAndState = { node: root, state };
    // 1. Tree traversal
    currentNodeAndState = traverseTree(game, currentNodeAndState);
    // 2. Node expansion
    currentNodeAndState = expandNode(game, currentNodeAndState);
    // 3. Rollout
    const rolloutValue = getRolloutValue(game, currentNodeAndState.state);
    // 4. Back propagation
    backPropagateValue(rolloutValue, currentNodeAndState.node);
    if (options.ucb1WithMinMax) {
      calculateUCB1Values(root, undefined, state.currentPlayer === game.O);
    } else {
      calculateUCB1Values(root);
    }
  }
  return root;
}

export function monteCarloTreeSearchNDPerformAction(initialRoot, action) {
  if (!initialRoot || !initialRoot.children) { return null; }
  return first(
    initialRoot.children
      .filter(n => isEqual(n.action, action)),
  ) || null;
}

function traverseTree(game, { node, state }) {
  if (node.isLeaf()) { return { node, state }; }
  const currentActions = game.getValidActions(state);
  const currentNodes = currentActions.map((action) => {
    let child = find(node.children, c => isEqual(c.action, action));
    if (!child) {
      child = new MonteCarloTreeSearchNode(action);
      node.addChild(child);
    }
    return child;
  });
  const nextNode = maxBy(currentNodes, (n => n.ucb1));
  const nextState = game.performAction(state, nextNode.action);
  return traverseTree(game, { node: nextNode, state: nextState });
}

function expandNode(game, { node, state }) {
  if (node.deepCount === 0) { return { node, state }; }

  const newNodes = getNewNodes(game, state);
  if (isEmpty(newNodes)) {
    node.isFinished = true;
    return { node, state };
  }

  node.setChildren(newNodes);
  const nextNode = sample(node.children);
  const nextState = game.performAction(state, nextNode.action);
  return { node: nextNode, state: nextState };
}

function getNewNodes(game, state) {
  const validActions = game.getValidActions(state);
  const newNodes = validActions.map(action => new MonteCarloTreeSearchNode(action));
  return newNodes;
}

function getRolloutValue(game, state) {
  if (game.isFinished(state)) { return game.getValue(state); }
  const nextAction = sample(game.getValidActions(state));
  const nextState = game.performAction(state, nextAction);
  return getRolloutValue(game, nextState);
}

function backPropagateValue(value, node) {
  node.deepValue += value;
  node.deepCount += 1;
  if (node.parent) { backPropagateValue(value, node.parent); }
}

function calculateUCB1Values(node, root = node, maximize = true) {
  // See: https://en.wikipedia.org/wiki/Monte_Carlo_tree_search#Exploration_and_exploitation
  if (node.isFinished) {
    node.ubc1 = Number.NEGATIVE_INFINITY;
  } else if (node === root || root.deepCount === 0 || node.deepCount === 0) {
    node.ucb1 = Number.POSITIVE_INFINITY;
  } else {
    const v = node.deepValue; // sum of subtree value estimation
    const n = node.deepCount; // total number of subtree value estimations
    const N = root.deepCount; // total number of all value estimations
    const c = options.ucb1ExplorationParameter; // exploration parameter
    const meanV = maximize ? v / n : 1 - v / n; // average subtree value estimation
    const ucb1 = meanV + c * Math.sqrt(Math.log(N) / n);
    node.ucb1 = ucb1;
  }
  node.children.forEach((child) => {
    if (options.ucb1WithMinMax) {
      calculateUCB1Values(child, root, !maximize);
    } else {
      calculateUCB1Values(child, root);
    }
  });
}

class MonteCarloTreeSearchNode {
  constructor(action) {
    this.parent = null;
    this.children = [];
    this.deepValue = 0;
    this.deepCount = 0;
    this.ucb1 = Number.POSITIVE_INFINITY;
    this.isFinished = false;
    this.action = action;
  }

  isLeaf() {
    return isEmpty(this.children);
  }

  setChildren(nodes) {
    nodes.forEach((n) => { n.parent = this; });
    this.children = nodes;
  }

  addChild(node) {
    node.parent = this;
    this.children.push(node);
  }

  getFirstChildren() {
    return this.children[0];
  }

  print(depth = 0, action) {
    // eslint-disable-next-line no-console
    console.log(repeat('  ', depth), '+-', action || 'ROOT');
    this.children.forEach((child) => {
      child.print(depth + 1, child.action);
    });
  }
}
