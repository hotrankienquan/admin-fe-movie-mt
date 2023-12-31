import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const store = (set) => ({
    info: [{
        username:"kienquan",
        password:"123123"
    }],
    addUser: (username,password) => {
        set(store => ({
            info: [...store.info, {username,password}]
        }))
    }
//   tasks: [],
//   addTask: (title, state) =>
//     set(
//       produce((store) => {
//         store.tasks.push({ title, state });
//       }),
//       //(store) => ({ tasks: [...store.tasks, { title, state }] }),
//       false,
//       'addTask'
//     ),
//   deleteTask: (title) =>
//     set((store) => ({
//       tasks: store.tasks.filter((task) => task.title !== title),
//     })),
 
  
});

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log(args);
      set(...args);
    },
    get,
    api
  );

export const useStore = create(
  (log(persist(devtools(store), { name: 'my zustand store' })))
);

