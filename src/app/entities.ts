export interface Attribute {
    regex: boolean,
    required: boolean,
    type: string,
    value: string
}

export interface Association {
    type: string,
    count: number
}

export interface Profile {
    settings: {
        attributes: {
            required: Attribute[],
            desired: Attribute[],
            failOnDuplicates: boolean,
            minNumberOfAttributes: number,
            maxNumberOfAttributes: number
        },
        associations: {
            required: Association[],
            desired: Association[]
        },
        tags: {
            required: string[],
            desired: string[]
        }
    }
}
