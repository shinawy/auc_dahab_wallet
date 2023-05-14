export interface IDictionary<TValue> {

    [id: string]: TValue

}

export interface ChainsInfo <TValue> {

    [id: string]: IDictionary<TValue>
    
}