import React from 'react'

import styled from 'styled-components'
import { theme } from 'assets/styles/constants'


type SortBarType = {
    sort: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const SortBar: React.FC<SortBarType> = ({sort, onChange}) => {

    return (
        <SelectContainer>
            <Select value = {sort} onChange = {onChange}>
                <option value="name">По имени</option>
                <option value="type">По типу</option>
                <option value="date">По дате</option>
            </Select>
        </SelectContainer>
    )
}


const SelectContainer = styled.div`
    display: flex;
    justify-content: right;
`

const Select = styled.select`
    width: 120px;
    height: 30px;
    background-color: ${theme.background};
    border: 1px solid ${theme.blue};
    outline: none;
    border-radius: 3px;
    color: ${theme.blue};
`
