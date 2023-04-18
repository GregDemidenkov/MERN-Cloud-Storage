import styled from 'styled-components'
import { flex } from 'assets/styles/constants'


export const Header = styled.div`
    ${flex}
    width: 100%;
    margin-bottom: 15px;
`

export const HeaderName = styled.div`
    ${(props: {color: string}) => props.color &&`
        color: ${props.color};
    `}
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

export const CloseButton = styled.button`
    border-radius: 10%;
    background-color: inherit;
    cursor: pointer;

    ${(props: {color: string}) => props.color &&`
        border: 1px solid ${props.color};
        color: ${props.color};
    `}

    :hover {
        opacity: 0.6;
    }

    :focus {
        ${(props: {color: string}) => props.color &&`
            border: 1px solid ${props.color};
        `}
    }
`