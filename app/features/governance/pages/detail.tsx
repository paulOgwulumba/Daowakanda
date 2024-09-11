import { DetailsPage } from '@/components/GovernPage/SubComponent/DetailsPage';

interface Props{
  title: any;
}
export function Detail({title}: Props) {
  return <DetailsPage title={title}/>;
}
