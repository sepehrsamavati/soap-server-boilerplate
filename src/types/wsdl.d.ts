export type WSDLParam = {
    [name: string]: WSDLParam
} | string

export type DescribedWSDL = {
    [service: string]: {
        [port: string]: {
            [method: string]: {
                input?: {
                    [name: string]: WSDLParam;
                }
                output?: {
                    [name: string]: WSDLParam;
                }
            }
        }
    }
}
