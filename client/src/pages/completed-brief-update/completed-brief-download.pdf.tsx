import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from 'antd';

import { CompletedBriefWithAnswers } from '../../models/completed-brief';
import { CompletedBriefPdf } from '../../pdf';
import formatDate from '../../utils/format-date';

interface Props {
  data: CompletedBriefWithAnswers;
}

export default function CompletedBriefDownloadPdf({ data }: Props) {
  return (
    <PDFDownloadLink
      document={<CompletedBriefPdf data={data} />}
      fileName={`brief-${data.brief.title}-${formatDate(data.dateCompleted)}.pdf`}
    >
      {({ loading }) => (
        <Button danger type="primary" loading={loading}>
          Завантажити в PDF
        </Button>
      )}
    </PDFDownloadLink>
  );
}
