import Datatable from '../datatable/Datatable';

const List = ({ columns }) => {
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable columns={columns} />
      </div>
    </div>
  );
};

export default List;
