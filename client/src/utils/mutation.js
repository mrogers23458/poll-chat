import { gql } from '@apollo/client'

export const GET_MESSAGES = gql `
    mutation postMessage ($content: String) {
    postMessage (content: $content) {
        _id
        content
    }
}`