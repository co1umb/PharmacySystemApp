import React from 'react';

import useLanguage from '@/locale/useLanguage';

import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import CrudModule from '@/modules/CrudModule/CrudModule';
import discountForm from '@/forms/discountForm';

export default function discountes() {
  const translate = useLanguage();
  const entity = 'discountes';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
    outputValue: '_id',
  };

  const deleteModalLabels = ['name'];

  const readColumns = [
    {
      title: translate('Name'),
      dataIndex: 'discountName',
    },
    {
      title: translate('Value'),
      dataIndex: 'discountValue',
    },
    {
      title: translate('Default'),
      dataIndex: 'isDefault',
    },
    {
      title: translate('enabled'),
      dataIndex: 'enabled',
    },
  ];
  const dataTableColumns = [
    {
      title: translate('Name'),
      dataIndex: 'discountName',
    },
    {
      title: translate('Value'),
      dataIndex: 'discountValue',
      render: (_, record) => {
        return <>{record.discountValue + '%'}</>;
      },
    },
    {
      title: translate('Default'),
      dataIndex: 'isDefault',
      key: 'isDefault',
      onCell: (record, rowIndex) => {
        return {
          props: {
            style: {
              width: '60px',
            },
          },
        };
      },
      render: (_, record) => {
        return (
          <Switch
            checked={record.isDefault}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        );
      },
    },
    {
      title: translate('enabled'),
      dataIndex: 'enabled',
      key: 'enabled',
      onCell: (record, rowIndex) => {
        return {
          props: {
            style: {
              width: '60px',
            },
          },
        };
      },
      render: (_, record) => {
        return (
          <Switch
            checked={record.enabled}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        );
      },
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('discountes'),
    DATATABLE_TITLE: translate('discountes_list'),
    ADD_NEW_ENTITY: translate('add_new_discount'),
    ENTITY_NAME: translate('discountes'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    readColumns,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };
  return (
    <CrudModule
      createForm={<discountForm />}
      updateForm={<discountForm isUpdateForm={true} />}
      config={config}
    />
  );
}
