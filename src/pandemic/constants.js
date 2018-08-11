export const DISEASE_BLUE = 'Blue';
export const DISEASE_YELLOW = 'Yellow';
export const DISEASE_BLACK = 'Black';
export const DISEASE_RED = 'Red';

export const diseases = [DISEASE_BLUE, DISEASE_YELLOW, DISEASE_BLACK, DISEASE_RED];

export const locations = [
  {
    id: 0,
    name: 'San Francisco',
    disease: 'Blue',
  },
  {
    id: 1,
    name: 'Chicago',
    disease: 'Blue',
  },
  {
    id: 2,
    name: 'Toronto',
    disease: 'Blue',
  },
  {
    id: 3,
    name: 'Atlanta',
    disease: 'Blue',
  },
  {
    id: 4,
    name: 'New York',
    disease: 'Blue',
  },
  {
    id: 5,
    name: 'Washington DC',
    disease: 'Blue',
  },
  {
    id: 6,
    name: 'London',
    disease: 'Blue',
  },
  {
    id: 7,
    name: 'Madrid',
    disease: 'Blue',
  },
  {
    id: 8,
    name: 'Essen',
    disease: 'Blue',
  },
  {
    id: 9,
    name: 'Paris',
    disease: 'Blue',
  },
  {
    id: 10,
    name: 'Milan',
    disease: 'Blue',
  },
  {
    id: 11,
    name: 'St. Petersburg',
    disease: 'Blue',
  },
  {
    id: 12,
    name: 'Algiers',
    disease: 'Black',
  },
  {
    id: 13,
    name: 'Cairo',
    disease: 'Black',
  },
  {
    id: 14,
    name: 'Riyadh',
    disease: 'Black',
  },
  {
    id: 15,
    name: 'Baghdad',
    disease: 'Black',
  },
  {
    id: 16,
    name: 'Istanbul',
    disease: 'Black',
  },
  {
    id: 17,
    name: 'Moscow',
    disease: 'Black',
  },
  {
    id: 18,
    name: 'Tehran',
    disease: 'Black',
  },
  {
    id: 19,
    name: 'Karachi',
    disease: 'Black',
  },
  {
    id: 20,
    name: 'Delhi',
    disease: 'Black',
  },
  {
    id: 21,
    name: 'Mumbai',
    disease: 'Black',
  },
  {
    id: 22,
    name: 'Chennai',
    disease: 'Black',
  },
  {
    id: 23,
    name: 'Kolkata',
    disease: 'Black',
  },
  {
    id: 24,
    name: 'Bangkok',
    disease: 'Red',
  },
  {
    id: 25,
    name: 'Jakarta',
    disease: 'Red',
  },
  {
    id: 26,
    name: 'Sydney',
    disease: 'Red',
  },
  {
    id: 27,
    name: 'Manila',
    disease: 'Red',
  },
  {
    id: 28,
    name: 'Ho Chi Minh',
    disease: 'Red',
  },
  {
    id: 29,
    name: 'Hong Kong',
    disease: 'Red',
  },
  {
    id: 30,
    name: 'Shanghai',
    disease: 'Red',
  },
  {
    id: 31,
    name: 'Beijing',
    disease: 'Red',
  },
  {
    id: 32,
    name: 'Seoul',
    disease: 'Red',
  },
  {
    id: 33,
    name: 'Tokyo',
    disease: 'Red',
  },
  {
    id: 34,
    name: 'Osaka',
    disease: 'Red',
  },
  {
    id: 35,
    name: 'Taipei',
    disease: 'Red',
  },
  {
    id: 36,
    name: 'Los Angeles',
    disease: 'Yellow',
  },
  {
    id: 37,
    name: 'Mexico City',
    disease: 'Yellow',
  },
  {
    id: 38,
    name: 'Miami',
    disease: 'Yellow',
  },
  {
    id: 39,
    name: 'Bogota',
    disease: 'Yellow',
  },
  {
    id: 40,
    name: 'Lima',
    disease: 'Yellow',
  },
  {
    id: 41,
    name: 'Santiago',
    disease: 'Yellow',
  },
  {
    id: 42,
    name: 'Buenos Aires',
    disease: 'Yellow',
  },
  {
    id: 43,
    name: 'São Paulo',
    disease: 'Yellow',
  },
  {
    id: 44,
    name: 'Lagos',
    disease: 'Yellow',
  },
  {
    id: 45,
    name: 'Khartoum',
    disease: 'Yellow',
  },
  {
    id: 46,
    name: 'Johannesburg',
    disease: 'Yellow',
  },
  {
    id: 47,
    name: 'Kinshasa',
    disease: 'Yellow',
  },
];

export const routes = [
  ['San Francisco', 'Chicago'],
  ['San Francisco', 'Tokyo'],
  ['San Francisco', 'Manila'],
  ['San Francisco', 'Los Angeles'],
  ['Chicago', 'Atlanta'],
  ['Chicago', 'Toronto'],
  ['Chicago', 'Los Angeles'],
  ['Chicago', 'Mexico City'],
  ['Toronto', 'New York'],
  ['Toronto', 'Washington DC'],
  ['New York', 'London'],
  ['New York', 'Madrid'],
  ['New York', 'Washington DC'],
  ['Atlanta', 'Washington DC'],
  ['Atlanta', 'Miami'],
  ['Washington DC', 'Miami'],
  ['London', 'Essen'],
  ['London', 'Madrid'],
  ['London', 'Paris'],
  ['Madrid', 'Paris'],
  ['Madrid', 'Algiers'],
  ['Madrid', 'São Paulo'],
  ['Paris', 'Essen'],
  ['Paris', 'Milan'],
  ['Paris', 'Algiers'],
  ['Essen', 'Milan'],
  ['Essen', 'St. Petersburg'],
  ['St. Petersburg', 'Moscow'],
  ['St. Petersburg', 'Istanbul'],
  ['Milan', 'Istanbul'],
  ['Los Angeles', 'Sydney'],
  ['Los Angeles', 'Mexico City'],
  ['Mexico City', 'Miami'],
  ['Mexico City', 'Bogota'],
  ['Mexico City', 'Lima'],
  ['Lima', 'Santiago'],
  ['Lima', 'Bogota'],
  ['Bogota', 'Miami'],
  ['Bogota', 'Buenos Aires'],
  ['Bogota', 'São Paulo'],
  ['São Paulo', 'Buenos Aires'],
  ['São Paulo', 'Lagos'],
  ['Lagos', 'Khartoum'],
  ['Lagos', 'Kinshasa'],
  ['Kinshasa', 'Johannesburg'],
  ['Kinshasa', 'Khartoum'],
  ['Khartoum', 'Johannesburg'],
  ['Khartoum', 'Cairo'],
  ['Algiers', 'Istanbul'],
  ['Cairo', 'Algiers'],
  ['Cairo', 'Istanbul'],
  ['Cairo', 'Baghdad'],
  ['Cairo', 'Riyadh'],
  ['Istanbul', 'Moscow'],
  ['Istanbul', 'Baghdad'],
  ['Moscow', 'Tehran'],
  ['Tehran', 'Baghdad'],
  ['Tehran', 'Karachi'],
  ['Tehran', 'Delhi'],
  ['Baghdad', 'Riyadh'],
  ['Baghdad', 'Karachi'],
  ['Riyadh', 'Karachi'],
  ['Karachi', 'Delhi'],
  ['Karachi', 'Mumbai'],
  ['Delhi', 'Mumbai'],
  ['Delhi', 'Chennai'],
  ['Delhi', 'Kolkata'],
  ['Mumbai', 'Chennai'],
  ['Chennai', 'Bangkok'],
  ['Chennai', 'Jakarta'],
  ['Chennai', 'Kolkata'],
  ['Kolkata', 'Hong Kong'],
  ['Kolkata', 'Bangkok'],
  ['Jakarta', 'Sydney'],
  ['Jakarta', 'Ho Chi Minh'],
  ['Jakarta', 'Bangkok'],
  ['Bangkok', 'Ho Chi Minh'],
  ['Bangkok', 'Hong Kong'],
  ['Ho Chi Minh', 'Manila'],
  ['Ho Chi Minh', 'Hong Kong'],
  ['Manila', 'Sydney'],
  ['Manila', 'Taipei'],
  ['Manila', 'Hong Kong'],
  ['Hong Kong', 'Shanghai'],
  ['Hong Kong', 'Taipei'],
  ['Shanghai', 'Taipei'],
  ['Shanghai', 'Tokyo'],
  ['Shanghai', 'Seoul'],
  ['Shanghai', 'Beijing'],
  ['Beijing', 'Seoul'],
  ['Seoul', 'Tokyo'],
  ['Tokyo', 'Osaka'],
  ['Osaka', 'Taipei'],
];

export const outbreaks = [
  { id: 48 },
  { id: 49 },
  { id: 50 },
  { id: 51 },
  { id: 52 },
  { id: 53 },
];