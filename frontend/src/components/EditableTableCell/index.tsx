import React, { useState, useEffect } from 'react';
import { TableCell, Input } from '@material-ui/core';
import { Maybe } from '../../utils/misc';

export interface Props {
    text: string,
    onChange: (newText: string) => void,
}

export default function EditableTableCell(props: Props) {
    let inputRef: Maybe<HTMLInputElement> = null;
    const [isEditing, updateIsEditing] = useState(false);
    const [tempText, updateTempText] = useState(props.text);

    useEffect(() => {
        const handleWindowClick = (event: MouseEvent) => {
            if (isEditing && event.target !== inputRef) {
                updateIsEditing(false);
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (isEditing && event.key === 'Escape') {
                event.preventDefault();
                updateIsEditing(false);
            }
        }

        window.addEventListener('click', handleWindowClick);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('click', handleWindowClick);
            window.removeEventListener('keyup', handleKeyUp);
        };
    });

    const handleTextClick = () => {
        updateIsEditing(true);
    }

    if (isEditing) {
        const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                updateIsEditing(false);
                props.onChange(tempText);
            }
        };

        const saveInputRef = (ref: any) => {
            if (ref instanceof HTMLInputElement) {
                inputRef = ref;
            }
        };

        return (
            <TableCell>
                <Input
                    inputRef={saveInputRef}
                    value={tempText}
                    onChange={event => updateTempText(event.target.value || '')}
                    onKeyPress={handleKeyPress}
                />
            </TableCell>
        );
    }

    return (
        <TableCell>
            <span onClick={handleTextClick}>{props.text}</span>
        </TableCell>
    );
}
