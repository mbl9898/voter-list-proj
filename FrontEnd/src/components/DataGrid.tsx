import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import GridPrintHeader from './GridPrintHeader';
import GridPrintFooter from './GridPrintFooter';
import { useAppSelector } from '../store/hooks';
import Loading from './Loading';
import './DataGrid.css';
import {
  dataBound,
  printComplete,
  toolbarClick,
  filterSettings,
  getUniqueData,
  onActionBegin,
} from '../services';
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Page,
  Filter,
  Inject,
  Grid,
  Resize,
  Freeze,
  Toolbar,
  VirtualScroll,
} from '@syncfusion/ej2-react-grids';

let headingsArr: string[];
let grid: Grid | null = null;
const DataGrid = () => {
  const data = useAppSelector((state) => state.app.data);
  const [uniqueBlockcodes, setUniqueBlockcodes] = useState([]);
  const headings = useAppSelector((state) => state.app.headings);
  const isListDisplay = useAppSelector((state) => state.app.isListDisplay);
  const isDataLoading = useAppSelector((state) => state.app.isDataLoading);

  headingsArr = headings;

  const beforePrint = (e: any) => {
    const header = document.createElement('div');
    header.id = 'header';
    e.element.insertBefore(header, e.element.childNodes[0]);
    ReactDOM.render(
      <GridPrintHeader uniqueBlockcodes={uniqueBlockcodes} />,
      header
    );
    const footer = document.createElement('div');
    footer.id = 'footer';
    e.element.appendChild(footer);

    ReactDOM.render(<GridPrintFooter />, footer);
  };
  useEffect(() => {}, [data, isListDisplay]);
  return (
    <>
      {isDataLoading && <Loading />}
      {!isDataLoading && (
        <div
          style={{
            margin: '3%',
            marginTop: '2%',
          }}
        >
          <div className='d-flex '>
            <button
              className='btn btn-primary m-2'
              onClick={async () => {
                if (grid) {
                  const uniqueBlockcodesArr: any = await getUniqueData(
                    { uniqueBlockcodes: true },
                    data
                  );
                  setUniqueBlockcodes(uniqueBlockcodesArr);
                  toolbarClick();
                  grid.print();
                }
              }}
            >
              <svg
                width='20px'
                height='20px'
                viewBox='0 0 512 512'
                className='svg-inline--fa fa-print fa-w-16 fa-7x me-2'
              >
                <path
                  fill='currentColor'
                  d='M400 264c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24zm32-88V99.88c0-12.73-5.06-24.94-14.06-33.94l-51.88-51.88c-9-9-21.21-14.06-33.94-14.06H110.48C93.64 0 80 14.33 80 32v144c-44.18 0-80 35.82-80 80v128c0 8.84 7.16 16 16 16h64v96c0 8.84 7.16 16 16 16h320c8.84 0 16-7.16 16-16v-96h64c8.84 0 16-7.16 16-16V256c0-44.18-35.82-80-80-80zM128 48h192v48c0 8.84 7.16 16 16 16h48v64H128V48zm256 416H128v-64h256v64zm80-112H48v-96c0-17.64 14.36-32 32-32h352c17.64 0 32 14.36 32 32v96z'
                  className=''
                ></path>
              </svg>
              Print
            </button>
          </div>
          <GridComponent
            ref={(g) => (grid = g)}
            actionBegin={onActionBegin}
            beforePrint={beforePrint}
            dataSource={data}
            printMode='CurrentPage'
            allowResizing={true}
            allowPaging={true}
            allowFiltering
            filterSettings={filterSettings}
            dataBound={dataBound}
            pageSettings={{ pageSize: 180 }}
            toolbarClick={toolbarClick}
            printComplete={printComplete}
          >
            <ColumnsDirective>
              {data[0]
                ? data[0]['S No'] && (
                    <ColumnDirective
                      field='S No'
                      headerText='S No'
                      textAlign='Left'
                      width='45'
                      isPrimaryKey={true}
                    />
                  )
                : ''}
              {headings.map((heading: string, index: number) => (
                <ColumnDirective
                  key={index}
                  field={heading}
                  headerText={heading}
                  textAlign='Left'
                  width='25'
                />
              ))}
            </ColumnsDirective>
            <Inject
              services={[
                Page,
                Filter,
                Resize,
                Freeze,
                Toolbar,
                VirtualScroll,
                Resize,
              ]}
            />
          </GridComponent>
        </div>
      )}
    </>
  );
};
export default DataGrid;
export { headingsArr, grid };
