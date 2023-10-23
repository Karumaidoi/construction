import styled from 'styled-components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal, Spin, Table, Tag } from 'antd';
import { TextField } from '@mui/material';
import { Img } from '@chakra-ui/react';
import { useDelete } from './useDelete';
import { useBooks } from './useBooks';
import { useEditOrder } from '../../hooks/useEditOrder';
import { formatDistanceFromNow } from '../../utils/helpers';

const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: 1.3rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    font-size: 1.3rem;
    /* padding: 0.4rem 0.6rem; */
    margin-right: 1.2rem;
    border-radius: 4px;
    border: none;
    color: whitesmoke;
    background-color: #323232;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: #272626;
    }
  }
`;

function OrdersTable() {
  const { editingOrder, isLoading: editingError } = useEditOrder();
  const { data: deleteOrder } = useDelete();
  const [editOrder, setEditOrder] = useState(null);
  const { books, isLoading } = useBooks();

  console.log(editOrder);

  const { reset, register, handleSubmit, formState } = useForm({});

  const { errors } = formState;

  const newEditOrder = editOrder;
  const orderId = newEditOrder?.id;

  // Columns Data
  const columnsData = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <div
          style={{
            height: '3rem',
            width: '3rem',
            backgroundImage: `${image}`,
            borderRadius: '4px',
            backgroundSize: 'cover',
          }}
        >
          <Img src={image} height={'100%'} />
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Project No',
      dataIndex: 'projectNumber',
      key: 'projectNumber',
    },
    {
      title: 'Bids',
      dataIndex: 'bids',
      key: 'bids',
      render: (bids) =>
        bids > 0 ? (
          <Tag color="processing" style={{ textTransform: 'capitalize' }}>
            {bids} Bids
          </Tag>
        ) : (
          <Tag color="error" style={{ textTransform: 'capitalize' }}>
            No Bids
          </Tag>
        ),
    },
    {
      title: 'Contractor',
      dataIndex: 'contractor',
      key: 'contractor',
    },

    {
      title: 'Edit',
      dataIndex: 'editId',
      key: 'editId',
      render: (newData) => (
        <Button
          onClick={() => {
            setEditOrder(newData);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'projectId',
      key: 'projectId',
      render: (id) => (
        <Button danger style={{ color: 'red' }} onClick={() => deleteOrder(id)}>
          Delete
        </Button>
      ),
    },
  ];

  const data = books?.map((book) => ({
    image: book?.image,
    editId: book,
    projectId: book?.id,
    title: book?.title,
    createdAt: formatDistanceFromNow(book?.created_at),
    bids: book?.bids,
    contractor: book?.Users?.userName,
    projectNumber: book?.projectNumber.split('-')[0],
  }));

  function handleCancel() {
    setEditOrder(() => {});
    reset();
  }

  function onSubmit(data) {
    console.log(data);
    const newBook = {
      title: data.title === '' ? newEditOrder?.title : data.title,
      description: data.description === '' ? newEditOrder?.description : data.description,
    };

    editingOrder(
      { newBook, orderId },
      {
        onSettled: () => {
          reset();
          setEditOrder(null);
        },
      }
    );
  }

  return (
    <>
      <Table dataSource={data} columns={columnsData} />
      <Modal
        title="Edit Project"
        open={editOrder?.id}
        onOk={handleSubmit(onSubmit)}
        onCancel={() => handleCancel()}
        mask={false}
        okText={editingError ? <Spin /> : 'Edit'}
      >
        <form style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
          <TextField id="outlined-basic" label={`Title`} variant="outlined" fullWidth {...register('title')} />

          <div style={{ marginBottom: '1rem' }}> </div>

          <div>
            <h5 style={{ marginBottom: '0.4rem' }}>Description</h5>
            <textarea
              style={{
                width: '100%',
                border: '1px solid black',
                borderRadius: '4px',
                minHeight: '4rem',
              }}
              {...register('description')}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}> </div>
        </form>
      </Modal>
    </>
  );
}

export default OrdersTable;
