import { Container, Stack, Typography } from '@mui/material';
import { Table, Tag, Button, Spin } from 'antd';
import { Helmet } from 'react-helmet-async';
import { useBids } from '../../hooks/bids/useBids';
import { formatDistanceFromNow } from '../../utils/helpers';
import { useUpdateBid } from '../../hooks/bids/useUpdateBid';

function BidsTable() {
  const { bids, gettingBids } = useBids();
  const { editBid, isEditingBid } = useUpdateBid();
  console.log(bids);

  function updateBid(data, type) {
    const newData = type === 'accept' ? { isAccepted: true, id: data?.id } : { isAccepted: false, id: data?.id };

    editBid(newData);
  }

  const columnsData = [
    {
      title: 'Bid ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Project No',
      dataIndex: 'projectNumber',
      key: 'projectNumber',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Bid By',
      dataIndex: 'bidBy',
      key: 'bidBy',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data) =>
        data === 'processing' ? (
          <Tag color="processing" style={{ textTransform: 'capitalize' }}>
            {data}
          </Tag>
        ) : (
          <Tag color={data === true ? 'success' : 'error'} style={{ textTransform: 'capitalize' }}>
            {data === true ? 'Accepted' : 'Declined'}
          </Tag>
        ),
    },

    {
      title: 'Accept',
      dataIndex: 'editId',
      key: 'editId',
      render: (data) => (
        <Button onClick={() => updateBid(data, 'accept')} disabled={data?.isAccepted === true || isEditingBid}>
          Accept
        </Button>
      ),
    },
    {
      title: 'Decline',
      dataIndex: 'editId',
      key: 'editId',
      render: (data) => (
        <Button
          danger
          style={{ color: 'red' }}
          disabled={data?.isAccepted === false || isEditingBid}
          onClick={() => updateBid(data, 'deline')}
        >
          Decline
        </Button>
      ),
    },
  ];

  const data = bids?.map((bid) => ({
    id: bid?.id,
    editId: bid,
    title: bid?.Projects?.title,
    projectNumber: bid?.Projects?.projectNumber.split('-')[0],
    createdAt: formatDistanceFromNow(bid?.created_at),
    bidBy: bid?.Users?.userName ?? 'Not Found',
    status: bid?.isAccepted === null ? 'processing' : bid?.isAccepted,
  }));

  if (gettingBids)
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin />
      </div>
    );

  return (
    <>
      <Helmet>
        <title> Dashboard: Bids | Construction Portal </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bids
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }} />
        </Stack>

        <Table dataSource={data} columns={columnsData} />
      </Container>
    </>
  );
}

export default BidsTable;
