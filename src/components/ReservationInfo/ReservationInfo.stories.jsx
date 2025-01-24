import ReservationInfo from './ReservationInfo';

export default {
  title: 'Components/ReservationInfo',
  component: ReservationInfo,
  argTypes: {
    reservation: {
      control: 'object',
      description: '예약 정보',
      defaultValue: { summary: null },
      options: {
        control: {
          type: 'object',
        },
      },
      table: {
        type: { summary: 'object' },
      },
    },
  },
  args: {
    reservation: {
      parkingName: '예약 주차장',
      parkingSlotId: '1234567890',
      reservationDate: '2025-01-01 10:00:00',
    },
  },
};

export const Default = (args) => <ReservationInfo {...args} />;
