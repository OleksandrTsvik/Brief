import { FilePdfOutlined } from '@ant-design/icons';
import { pdf } from '@react-pdf/renderer';
import { App, Button, Tooltip } from 'antd';
import { saveAs } from 'file-saver';

import { useLazyGetCompletedBriefQuery } from '../../api/completed-brief.api';
import { CompletedBriefPdf } from '../../pdf';
import formatDate from '../../utils/format-date';

interface Props {
  id: string;
}

export default function DownloadCompletedBriefButton({ id }: Props) {
  const { notification } = App.useApp();
  const [getCompletedBrief, { isFetching }] = useLazyGetCompletedBriefQuery();

  const handleDownloadPdf = async () => {
    try {
      const completedBrief = await getCompletedBrief({ id }).unwrap();

      const asPdf = pdf(<CompletedBriefPdf data={completedBrief} />);
      const blob = await asPdf.toBlob();

      const fileName = `brief-${completedBrief.brief.title}-${formatDate(completedBrief.dateCompleted)}.pdf`;

      saveAs(blob, fileName);
    } catch {
      notification.error({
        message: 'Виникла помилка під час завантаження PDF',
        placement: 'bottomRight',
      });
    }
  };

  return (
    <Tooltip title="Завантажити в PDF">
      <Button
        danger
        type="default"
        icon={<FilePdfOutlined />}
        loading={isFetching}
        onClick={handleDownloadPdf}
      />
    </Tooltip>
  );
}
