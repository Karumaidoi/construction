/* eslint-disable no-var */
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { Container, Stack, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';
import { Modal, Divider } from 'antd';
import { ProductFilterSidebar } from '../sections/@dashboard/products';
import OrdersTable from '../layouts/orders/OrdersTable';
import { useCreateOrder } from '../hooks/useCreateOrder';
import { useAppState } from '../context/userContext';

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

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading: isCreatingBook, creteOrderReq } = useCreateOrder();
  const { user } = useAppState();

  const { register, formState, handleSubmit, reset } = useForm();

  const { errors } = formState;

  console.log(errors);

  const showModal = () => {
    setIsModalOpen(true);
  };

  function onSubmit(data) {
    const newProject = { ...data, image: data?.image[0], User: user?.id, projectNumber: uuidv4() };
    creteOrderReq(newProject, {
      onSettled: () => {
        reset();
        setIsModalOpen(false);
      },
    });
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Construction Portal </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Construction Projects
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar handleToggle={showModal} />
          </Stack>
        </Stack>
        <OrdersTable />
        <Modal
          title="Create a Project"
          open={isModalOpen}
          onOk={handleSubmit(onSubmit)}
          onCancel={() => handleCancel()}
          mask={false}
          okText={isCreatingBook ? <Spinner color="white" height={'1rem'} width={'1rem'} /> : 'Create'}
        >
          <form
            style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id="outlined-basic"
              label={`Title`}
              variant="outlined"
              fullWidth
              {...register('title', { required: 'This field is required' })}
            />

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
                {...register('description', { required: 'This field is required' })}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}> </div>

            <TextField
              {...register('location', { required: 'This field is required' })}
              id="outlined-basic"
              label="Location"
              variant="outlined"
              fullWidth
            />

            <div style={{ marginBottom: '1rem' }}> </div>

            <Divider />

            <div style={{ marginTop: '1rem' }}>
              <FileInput id="image" accept="*" {...register('image', { required: 'This field is required' })} />
            </div>
          </form>
        </Modal>
      </Container>
    </>
  );
}
