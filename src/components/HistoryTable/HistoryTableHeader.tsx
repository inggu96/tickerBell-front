interface HistoryTableHeaderProps {
  column: IEventHistoryTableReserverType;
}

export const HistoryTableHeader: React.FC<HistoryTableHeaderProps> = ({
  column,
}) => {
  const {
    eventName,
    casting,
    startEvent,
    place,
    ticketHolderCounts,
    isCancelled,
  } = column;

  return (
    <tr className="text-sm font-medium text-center text-gray-900">
      {eventName && <th className="px-6 py-4">{eventName}</th>}
      {casting && <th className="px-6 py-4">{casting}</th>}
      {startEvent && <th className="px-6 py-4">{startEvent}</th>}
      {place && <th className="px-6 py-4">{place}</th>}
      {isCancelled && <th className="px-6 py-4">{isCancelled}</th>}
      {ticketHolderCounts && (
        <th className="px-6 py-4">{ticketHolderCounts}</th>
      )}
      <th className="px-6 py-4">취소</th>
    </tr>
  );
};
