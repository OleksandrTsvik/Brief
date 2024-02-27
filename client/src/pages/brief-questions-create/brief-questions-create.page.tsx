import { Breadcrumb, Button, Form, Input, Radio, Space } from 'antd';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import AnswerOptionsList from './answer-options.list';
import { useGetBriefQuery } from '../../api/brief.api';
import { useCreateQuestionMutation } from '../../api/question.api';
import { CustomSpin, ErrorMessage } from '../../components';
import { QuestionType } from '../../models/question';

export interface AnswerOption {
  position: number;
  answerOption: string;
}

interface FormValues {
  question: string;
  type: QuestionType;
  answerOptions: AnswerOption[];
}

export default function BriefQuestionsCreatePage() {
  const { briefId } = useParams();
  const { data, isFetching } = useGetBriefQuery({ id: briefId as string });

  const navigate = useNavigate();

  const [createQuestion, { isLoading, isError, error }] =
    useCreateQuestionMutation();

  const [form] = Form.useForm<FormValues>();
  const answerType = Form.useWatch('type', form);

  if (isFetching) {
    return <CustomSpin />;
  }

  if (!data) {
    return <Navigate to="/not-found" replace />;
  }

  const handleSubmit = (values: FormValues) => {
    const answerOptions: AnswerOption[] = values.answerOptions
      ? values.answerOptions.map((item, index) => ({
          position: index + 1,
          answerOption: item.answerOption,
        }))
      : [];

    const body = {
      briefId: data.id,
      position: -1,
      ...values,
      answerOptions,
    };

    createQuestion(body)
      .unwrap()
      .then(() => navigate(`/admin/briefs/questions/${briefId}`));
  };

  return (
    <>
      <Breadcrumb
        items={[
          { title: <Link to="/admin/briefs">Брифи</Link> },
          {
            title: (
              <Link to={`/admin/briefs/questions/${data.id}`}>
                {data.title}
              </Link>
            ),
          },
          { title: 'Створення запитання' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <Form
        layout="vertical"
        form={form}
        initialValues={{ type: QuestionType.Input, answerOptions: [] }}
        onFinish={handleSubmit}
      >
        {isError && (
          <Form.Item>
            <ErrorMessage error={error} />
          </Form.Item>
        )}

        <Form.Item
          name="question"
          label="Запитання"
          rules={[{ required: true, message: 'Введіть запитання' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="Оберіть варіант відповіді на запитання"
          rules={[{ required: true, message: 'Оберіть один з варіантів' }]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={QuestionType.Input}>Текстове поле</Radio>
              <Radio value={QuestionType.Single}>Вибір однієї відповіді</Radio>
              <Radio value={QuestionType.Multiple}>
                Вибір декількох відповідей
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        {(answerType === QuestionType.Single ||
          answerType === QuestionType.Multiple) && (
          <AnswerOptionsList
            getFieldValue={() => form.getFieldValue('answerOptions')}
            setFieldValue={(value) =>
              form.setFieldValue('answerOptions', value)
            }
          />
        )}

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            Створити
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
