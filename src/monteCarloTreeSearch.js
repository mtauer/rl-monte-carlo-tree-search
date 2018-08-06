/* eslint-disable no-param-reassign */
import isEmpty from 'lodash/isEmpty';
import sample from 'lodash/sample';
import maxBy from 'lodash/maxBy';
import first from 'lodash/first';

const options = {
  learningTimeInMs: 100,
  ucb1ExplorationParameter: Math.sqrt(2), // originally it's Math.sqrt(2)
};

export default function monteCarloTreeSearch(game, state, initialRoot) {
  const startTime = performance.now();
  let root;
  if (initialRoot) {
    root = initialRoot;
  } else {
    root = new MonteCarloTreeSearchNode(null, state);
    root.setChildren(getNewNodes(game, state));
  }
  while ((performance.now() - startTime) < options.learningTimeInMs) {
    let currentNode;
    // 1. Tree traversal
    currentNode = traverseTree(root);
    // 2. Node expansion
    currentNode = expandNode(game, currentNode);
    // 3. Rollout
    const rolloutValue = getRolloutValue(game, currentNode.state);
    // 4. Back propagation
    backPropagateValue(currentNode, rolloutValue);
    calculateUCB1Values(root, undefined, state.currentPlayer === game.O);
  }
  return root;
}

export function monteCarloTreeSearchPerformAction(initialRoot, action) {
  if (!initialRoot || !initialRoot.children) { return null; }
  return first(
    initialRoot.children
      .filter(n => n.action.index === action.index),
  ) || null;
}

function traverseTree(node) {
  if (node.isLeaf()) { return node; }
  return traverseTree(maxBy(node.children, (n => n.ucb1)));
}

function expandNode(game, node) {
  if (node.deepCount === 0) { return node; }

  const newNodes = getNewNodes(game, node.state);
  if (isEmpty(newNodes)) {
    node.isFinished = true;
    return node;
  }

  node.setChildren(newNodes);
  return sample(node.children);
}

function getNewNodes(game, state) {
  const validActions = game.getValidActions(state);
  const newNodes = validActions.map(action => new MonteCarloTreeSearchNode(
    action,
    game.performAction(state, action),
  ));
  return newNodes;
}

function getRolloutValue(game, state) {
  if (game.isFinished(state)) { return game.getValue(state); }
  const nextAction = sample(game.getValidActions(state));
  const nextState = game.performAction(state, nextAction);
  return getRolloutValue(game, nextState);
}

function backPropagateValue(node, value) {
  node.deepValue += value;
  node.deepCount += 1;
  if (node.parent) { backPropagateValue(node.parent, value); }
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
  node.children.forEach((child) => { calculateUCB1Values(child, root, !maximize); });
}

class MonteCarloTreeSearchNode {
  constructor(action, state) {
    this.parent = null;
    this.children = [];
    this.deepValue = 0;
    this.deepCount = 0;
    this.ucb1 = Number.POSITIVE_INFINITY;
    this.isFinished = false;
    this.action = action;
    this.state = state;
  }

  isLeaf() {
    return isEmpty(this.children);
  }

  setChildren(nodes) {
    nodes.forEach((n) => { n.parent = this; });
    this.children = nodes;
  }

  getFirstChildren() {
    return this.children[0];
  }
}
