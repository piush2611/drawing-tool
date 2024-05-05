import React from "react";

export const STROKES = [1, 3, 5, 8, 10];

export const COLORS = ['black', 'red', 'blue', 'green'];


export const ACTION_TYPES = {
    UNDO : 'UNDO',
    REDO : 'REDO',
    DOWNLOAD: 'DOWNLOAD',
    ERASE: 'ERASE',
    RESET: 'RESET'
}

export const ACTIONS = [
    {
        icon: <span>↩</span>,
        actionType: ACTION_TYPES.UNDO
    },
    {
        icon: <span>↪</span>,
        actionType: ACTION_TYPES.REDO
    },
    {
        icon: <span>⬇️</span>,
        actionType: ACTION_TYPES.DOWNLOAD
    },
    {
        icon: <span>🧽</span>,
        actionType: ACTION_TYPES.ERASE
    },
    {
        icon: <span>🗑️</span>,
        actionType: ACTION_TYPES.RESET
    }
]