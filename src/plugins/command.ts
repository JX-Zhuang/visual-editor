
export function createCommander() {
    // const state = {
    //     current: -1,
    //     queue: [] as ICommandExectue[],
    //     commands: {} as Record<string, (...args: any[]) => void>
    // };
    // const register = (command: ICommand) => {
    //     state.commands[command.name] = (...args) => {
    //         const { undo, redo } = command.exectue(...args);
    //         if (command.followQueue) {
    //             state.queue.push({ undo, redo });
    //             state.current++;
    //         }
    //         redo();
    //     }
    // };
    // register({
    //     name: 'undo',
    //     keyboard: 'ctrl+z',
    //     followQueue: false,
    //     exectue: () => {
    //         //命令被执行时，要做的事情
    //         return {
    //             undo: () => { },
    //             redo: () => {
    //                 const { current } = state;
    //                 if (current === -1) return;
    //                 const { undo } = state.queue[current];
    //                 undo && undo();
    //                 state.current--;
    //             }
    //         }
    //     }
    // });
    // register({
    //     name: 'redo',
    //     keyboard: ['ctrl+y', 'ctrl+shift+z'],
    //     followQueue: false,
    //     exectue: () => {
    //         //命令被执行时，要做的事情
    //         return {
    //             undo: () => { },
    //             redo: () => {
    //                 const { current } = state;
    //                 if (!state.queue[current]) return;
    //                 const { redo } = state.queue[current];
    //                 redo && redo();
    //                 state.current++;
    //             }
    //         }
    //     }
    // });
    // return {
    //     register,
    //     state
    // }
}