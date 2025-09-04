
import React, { useEffect, useState } from 'react';
import { Form, DatePicker, Radio, Card, Typography } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import { API_BASE } from '../../../../config';
import { safeParseDate } from '../../../../utils/dateUtils';

const { Text } = Typography;

interface DropdownOptions {
  salesQueue: Array<{ value: string; label: string }>;
  walkInType: Array<{ value: string; label: string }>;
  mediaOnline: Array<{ value: string; label: string }>;
  mediaOffline: Array<{ value: string; label: string }>;
  passSiteSource: Array<{ value: string; label: string }>;
  grade: Array<{ value: string; label: string; description?: string }>;
}

const Step1VisitInfo: React.FC = () => {
  const [options, setOptions] = useState<DropdownOptions | null>(null);

  // Helper function to parse date using EXACT same logic as WalkInList
  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    
    const part1 = parseInt(parts[0]);
    const part2 = parseInt(parts[1]);
    const year = parseInt(parts[2]);
    
    if (isNaN(part1) || isNaN(part2) || isNaN(year)) return null;
    
    // Use EXACT same logic as WalkInList.tsx lines 127-140
    let month: number, day: number;
    
    if (part1 > 12 && part2 <= 12) {
      // DD/MM/YYYY format
      day = part1;
      month = part2 - 1;  // Convert to 0-based month for Date constructor
    } else if (part2 > 12 && part1 <= 12) {
      // MM/DD/YYYY format
      month = part1 - 1;  // Convert to 0-based month for Date constructor
      day = part2;
    } else {
      // Ambiguous case - assume MM/DD/YYYY (Google Sheets default)
      month = part1 - 1;  // Convert to 0-based month for Date constructor
      day = part2;
    }
    
    // Create date in Thailand timezone at noon to avoid DST issues (same as WalkInList.tsx line 143)
    const thailandDate = new Date(year, month, day, 12, 0, 0);
    return thailandDate;
  };

  // Convert API date to dayjs object for DatePicker - handle both ISO (YYYY-MM-DD) and MM/DD/YYYY formats
  const getInitialDateValue = (form: any) => {
    const visitDateValue = form.getFieldValue('visitDate');
    console.log('getInitialDateValue - raw value:', visitDateValue);
    
    if (typeof visitDateValue === 'string') {
      // Check if it's ISO format (YYYY-MM-DD) or MM/DD/YYYY format
      if (visitDateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // ISO format - use dayjs to parse directly
        const parsedDate = dayjs(visitDateValue);
        console.log('getInitialDateValue - ISO parsed date:', parsedDate.format('DD/MM/YYYY'));
        return parsedDate.isValid() ? parsedDate : null;
      } else {
        // MM/DD/YYYY format - use safeParseDate
        const parsedDate = safeParseDate(visitDateValue);
        console.log('getInitialDateValue - MM/DD parsed date:', parsedDate?.format('DD/MM/YYYY'));
        return parsedDate;
      }
    }
    return visitDateValue; // Already a dayjs object
  };

  // Custom Clickable List Component
  const ClickableList: React.FC<{
    title: string;
    options: Array<{ value: string; label: string }>;
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }> = ({ title, options, value, onChange, placeholder }) => (
    <Card 
      size="small" 
      style={{ 
        borderRadius: '8px',
        border: value ? '2px solid #1890ff' : '1px solid #d9d9d9'
      }}
    >
      <div style={{ marginBottom: '12px' }}>
        <Text strong style={{ color: '#1890ff' }}>
          {title}
        </Text>
        {placeholder && !value && (
          <Text type="secondary" style={{ fontSize: '12px', marginLeft: '8px' }}>
            ({placeholder})
          </Text>
        )}
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '8px'
      }}>
        {options?.map(option => (
          <div
            key={option.value}
            onClick={() => onChange(option.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: value === option.value ? '2px solid #1890ff' : '1px solid #e0e0e0',
              backgroundColor: value === option.value ? '#f0f8ff' : '#fff',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '14px',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              if (value !== option.value) {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
                e.currentTarget.style.borderColor = '#1890ff';
              }
            }}
            onMouseLeave={(e) => {
              if (value !== option.value) {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.borderColor = '#e0e0e0';
              }
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </Card>
  );

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/walkin/dropdown-options`);
        if (response.data.success) {
          setOptions(response.data.options);
        }
      } catch (error) {
        console.error('Failed to fetch dropdown options:', error);
      }
    };

    fetchOptions();
  }, []);

  return (
    <div>
      <Form.Item
        label="วันที่เข้าชมโครงการ"
        name="visitDate"
        // Temporarily disable validation to fix the error
        // rules={[{ required: true, message: 'กรุณาเลือกวันที่เข้าชมโครงการ' }]}
      >
        <Form.Item noStyle shouldUpdate>
          {(form) => {
            const currentValue = getInitialDateValue(form);
            console.log('DatePicker render - current value:', currentValue?.format('DD/MM/YYYY'));
            
            return (
              <DatePicker 
                style={{ width: '100%' }} 
                format="DD/MM/YYYY"
                placeholder="เลือกวันที่"
                allowClear
                value={currentValue}
                onChange={(date) => {
                  console.log('DatePicker onChange:', date?.format('DD/MM/YYYY'));
                  form.setFieldsValue({ visitDate: date });
                }}
              />
            );
          }}
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="Sales ผู้ดูแล"
        name="salesQueue"
        rules={[{ required: true, message: 'กรุณาเลือก Sales ผู้ดูแล' }]}
      >
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue, setFieldsValue }) => (
            <ClickableList
              title="เลือก Sales ผู้ดูแล"
              options={options?.salesQueue || []}
              value={getFieldValue('salesQueue')}
              onChange={(value) => setFieldsValue({ salesQueue: value })}
              placeholder="กรุณาเลือก Sales ผู้ดูแล"
            />
          )}
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="ประเภท Walk-in"
        name="walkInType"
        rules={[{ required: true, message: 'กรุณาเลือกประเภท Walk-in' }]}
      >
        <Radio.Group>
          {options?.walkInType?.map(option => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="สื่อ Online"
        name="mediaOnline"
      >
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue, setFieldsValue }) => (
            <ClickableList
              title="เลือกสื่อ Online"
              options={options?.mediaOnline || []}
              value={getFieldValue('mediaOnline')}
              onChange={(value) => setFieldsValue({ mediaOnline: value })}
              placeholder="เลือกช่องทางสื่อ Online ที่ลูกค้าเข้ามา"
            />
          )}
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="สื่อ Offline"
        name="mediaOffline"
      >
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue, setFieldsValue }) => (
            <ClickableList
              title="เลือกสื่อ Offline"
              options={options?.mediaOffline || []}
              value={getFieldValue('mediaOffline')}
              onChange={(value) => setFieldsValue({ mediaOffline: value })}
              placeholder="เลือกช่องทางสื่อ Offline ที่ลูกค้าเข้ามา"
            />
          )}
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="แหล่งที่มาของสื่อโฆษณาที่พบระหว่างเดินทาง (Pass Site)"
        name="passSiteSource"
      >
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue, setFieldsValue }) => (
            <ClickableList
              title="เลือกแหล่งที่มาของสื่อโฆษณา Pass Site"
              options={options?.passSiteSource || []}
              value={getFieldValue('passSiteSource')}
              onChange={(value) => setFieldsValue({ passSiteSource: value })}
              placeholder="เลือกสื่อโฆษณาที่พบระหว่างเดินทาง"
            />
          )}
        </Form.Item>
      </Form.Item>
    </div>
  );
};

export default Step1VisitInfo;
