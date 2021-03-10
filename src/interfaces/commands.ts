export interface ICommandExectue {
    undo: () => void;
    redo: () => void;
}
export interface ICommand {
    name: string;       //命令唯一表示
    keyboard?: string | string[];   //快捷键
    exectue: (...args: any[]) => ICommandExectue;   //被执行时所做的内容
    followQueue?: boolean;  //命令执行完后，是否将命令执行得到的undo、redo存入命令队列
}
export interface ICommandManager {
    queue: ICommandExectue[];
    current: number;
}