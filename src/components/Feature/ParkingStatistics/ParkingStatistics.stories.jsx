import ParkingStatistics from './ParkingStatistics';

export default {
  title: 'Feature/ParkingStatistics',
  component: ParkingStatistics,
  argTypes: {
    statistics: {
      control: {
        type: 'object',
      },
    },
  },
  args: {
    statistics: {
      availableSlots: 10,
      totalSlots: 20,
      typeCounts: { A: 5, B: 3, C: 2 },
      typeColors: { A: 'red', B: 'blue', C: 'green' },
    },
  },
};

const Template = (args) => <ParkingStatistics {...args} />;

export const Default = Template.bind({});
