export default [
  {
    habitName: 'Meditate',
    type: 'number',
    units: 'minutes',
    maxScore: 30,
    valueForMaxScore: 30,
    timeBlock: 'morning',
    completions: [
      {
        date: new Date('12/5/2017'),
        value: true
      }
    ]
  },
  {
    habitName: 'Do Hello Chinese',
    type: 'boolean',
    maxScore: 10,
    valueForMaxScore: true,
    timeBlock: 'evening',
    completions: [
      {
        date: new Date('12/5/2017'),
        value: true
      }
    ]
  }
];
