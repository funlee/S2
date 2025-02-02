import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { SheetComponent, Switcher } from '@antv/s2-react';
import insertCss from 'insert-css';
import '@antv/s2-react/dist/style.min.css';

fetch(
  'https://gw.alipayobjects.com/os/bmw-prod/2a5dbbc8-d0a7-4d02-b7c9-34f6ca63cff6.json',
)
  .then((res) => res.json())
  .then((dataCfg) => {
    const s2Options = {
      width: 600,
      height: 480,
    };

    // 明细表只需要 columns 字段
    const defaultFields = {
      columns: ['province', 'city', 'type', 'sub_type', 'number'],
    };

    const defaultSwitcherFields = {
      columns: {
        selectable: true,
        items: [
          { id: 'province' },
          { id: 'city' },
          { id: 'type' },
          { id: 'sub_type' },
          { id: 'number' },
        ],
      },
    };

    // 生成 switcher 所需要的 fields 结构
    function generateSwitcherFields(updatedResult) {
      return {
        columns: {
          selectable: true,
          items: updatedResult.columns.items,
        },
      };
    }

    // 生成 dataCfg fields 结构
    function generateFields(updatedResult) {
      return {
        columns: updatedResult.columns.items.map((i) => i.id),
      };
    }

    const SwitcherDemo = () => {
      const [fields, setFields] = useState(defaultFields);
      const [hiddenColumnFields, setHiddenColumnFields] = useState([]);
      const [switcherFields, setSwitcherFields] = useState(
        defaultSwitcherFields,
      );

      const onSubmit = (result) => {
        setFields(generateFields(result));
        setSwitcherFields(generateSwitcherFields(result));
        setHiddenColumnFields(result.columns.hideItems.map((i) => i.id));
      };

      return (
        <div>
          <Switcher {...switcherFields} onSubmit={onSubmit} />
          <SheetComponent
            sheetType="table"
            adaptive={false}
            dataCfg={{ ...dataCfg, fields }}
            options={{ ...s2Options, interaction: { hiddenColumnFields } }}
          />
        </div>
      );
    };

    ReactDOM.render(<SwitcherDemo />, document.getElementById('container'));
  });

insertCss(`
  .antv-s2-switcher-item.checkable-item {
    align-items: center;
  }
`);
