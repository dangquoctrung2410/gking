import type { FormInstance, NamePath, Store, WatchOptions } from './interface';
type ReturnPromise<T> = T extends Promise<infer ValueType> ? ValueType : never;
type GetGeneric<TForm extends FormInstance> = ReturnPromise<ReturnType<TForm['validateFields']>>;
export declare function stringify(value: any): string | number;
declare function useWatch<TDependencies1 extends keyof GetGeneric<TForm>, TForm extends FormInstance, TDependencies2 extends keyof GetGeneric<TForm>[TDependencies1], TDependencies3 extends keyof GetGeneric<TForm>[TDependencies1][TDependencies2], TDependencies4 extends keyof GetGeneric<TForm>[TDependencies1][TDependencies2][TDependencies3]>(dependencies: [TDependencies1, TDependencies2, TDependencies3, TDependencies4], form?: TForm | WatchOptions<TForm>): GetGeneric<TForm>[TDependencies1][TDependencies2][TDependencies3][TDependencies4];
declare function useWatch<TDependencies1 extends keyof GetGeneric<TForm>, TForm extends FormInstance, TDependencies2 extends keyof GetGeneric<TForm>[TDependencies1], TDependencies3 extends keyof GetGeneric<TForm>[TDependencies1][TDependencies2]>(dependencies: [TDependencies1, TDependencies2, TDependencies3], form?: TForm | WatchOptions<TForm>): GetGeneric<TForm>[TDependencies1][TDependencies2][TDependencies3];
declare function useWatch<TDependencies1 extends keyof GetGeneric<TForm>, TForm extends FormInstance, TDependencies2 extends keyof GetGeneric<TForm>[TDependencies1]>(dependencies: [TDependencies1, TDependencies2], form?: TForm | WatchOptions<TForm>): GetGeneric<TForm>[TDependencies1][TDependencies2];
declare function useWatch<TDependencies extends keyof GetGeneric<TForm>, TForm extends FormInstance>(dependencies: TDependencies | [TDependencies], form?: TForm | WatchOptions<TForm>): GetGeneric<TForm>[TDependencies];
declare function useWatch<TForm extends FormInstance>(dependencies: [], form?: TForm | WatchOptions<TForm>): GetGeneric<TForm>;
declare function useWatch<TForm extends FormInstance>(dependencies: NamePath, form?: TForm | WatchOptions<TForm>): any;
declare function useWatch<ValueType = Store>(dependencies: NamePath, form?: FormInstance | WatchOptions<FormInstance>): ValueType;
export default useWatch;
