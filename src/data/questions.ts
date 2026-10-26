export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export const questions: Question[] = [
  {
    id: 'q1',
    text: 'Which of the following is NOT a JavaScript data type?',
    options: ['String', 'Boolean', 'Float', 'Symbol', 'Undefined'],
    correctIndex: 2,
  },
  {
    id: 'q2',
    text: 'What does the HTTP status code 404 represent?',
    options: [
      'Internal Server Error',
      'Bad Request',
      'Unauthorized',
      'Not Found',
      'Service Unavailable',
    ],
    correctIndex: 3,
  },
  {
    id: 'q3',
    text: 'Which data structure follows the FIFO (First In, First Out) principle?',
    options: ['Stack', 'Queue', 'Binary Tree', 'Hash Map', 'Linked List'],
    correctIndex: 1,
  },
  {
    id: 'q4',
    text: 'What is the default port number for HTTPS?',
    options: ['80', '8080', '443', '3000', '21'],
    correctIndex: 2,
  },
  {
    id: 'q5',
    text: 'Which CSS property is used to change the text color of an element?',
    options: ['font-color', 'text-color', 'color', 'foreground-color', 'text-style'],
    correctIndex: 2,
  },
  {
    id: 'q6',
    text: 'What does SQL stand for?',
    options: [
      'Structured Query Language',
      'Simple Query Language',
      'Standard Query Logic',
      'Sequential Query Language',
      'System Query Language',
    ],
    correctIndex: 0,
  },
  {
    id: 'q7',
    text: 'Which of the following sorting algorithms has the best average-case time complexity?',
    options: [
      'Bubble Sort',
      'Selection Sort',
      'Merge Sort',
      'Insertion Sort',
      'Bogo Sort',
    ],
    correctIndex: 2,
  },
];
