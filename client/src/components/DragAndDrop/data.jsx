
export const boardColumns = [{
    index: '3',
    title: 'TODO'
}, {
    index: '4',
    title: 'IN_PROGRESS'
}, {
    index: '1',
    title: 'DONE'
}, {
        index: '2',
        title: 'INCOMING'
}];

export const columnItems = [
    {
        id: '1',
        content: {
            title: 'Ronaldo Transfer To Man U', description: 'Sometimes life is scary and dark',
            deadline: new Date().toLocaleString(),
            comments: [
                { id: 1, text: 'Here We Go', user: 'Fabrizio Romano' }
            ]
        },
        columnKey: boardColumns.find(column => column.index === '2')
    },
    {
        id: '2',
        content:
            'Sucking at something is the first step towards being sorta good at something.',
        content: {
            title: 'Ronaldo Transfer To Man U', description: 'Sometimes life is scary and dark',
            deadline: new Date().toLocaleString(),
            comments: [
                { id: 1, text: 'Here We Go', user: 'Fabrizio Romano' }
            ]
        },
        columnKey: boardColumns.find(column => column.index === '1')
    },
    {
        id: '3',
        content: {
            title: 'You got to focus on what\'s real, man\', description: \'Sometimes life is scary and dark',
            deadline: new Date().toLocaleString(),
            comments: [
                { id: 1, text: 'Here We Go', user: 'Fabrizio Romano' }
            ]
        },
        columnKey: boardColumns.find(column => column.index === '1')
    },
    {
        id: '4',
        content: {
            title: 'Is that where creativity comes from? From sad biz?', description: 'Sometimes life is scary and dark',
            deadline: new Date().toLocaleString(),
            comments: [
                { id: 1, text: 'Here We Go', user: 'Fabrizio Romano' }
            ]
        },
        columnKey: boardColumns.find(column => column.index === 3)
    }
];
