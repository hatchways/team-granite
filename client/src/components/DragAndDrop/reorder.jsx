
export const reorderColumn = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const reorderColumnCardMap = ({ columnMap, source, destination }) => {
    const columns = Object.keys(columnMap);
    const [current, next] = [columnMap[source.droppableId], columnMap[destination.droppableId]];
    const target = current[source.index];
    const index = String(columns.indexOf(destination.droppableId));
    target.columnId = { index, name: destination.droppableId}
    
    if (source.droppableId === destination.droppableId) {
        const reordered = reorderColumn(current, source.index, destination.index);
        const result = {...columnMap, [source.droppableId]: reordered};
        return {columnMap: result};
    }

    current.splice(source.index, 1);
    next.splice(destination.index, 0, target);
    const result = {
        ...columnMap,
        [source.droppableId]: current,
        [destination.droppableId]: next
    };
    return {columnMap: result};
};


