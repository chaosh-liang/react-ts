import React, { FormEvent, useState } from 'react';
import { Input } from 'antd';
import axios from 'http/axios';
import { api } from 'http/api';

export default function List() {
  const [value, setValue] = useState('');

  const changeHandler = async (ev: FormEvent): Promise<void> => {
    setValue((ev.target as HTMLInputElement).value);
    try {
      const result = await axios.get(api.topics, {
        params: {
          page: 1,
          tab: 'good',
          limit: 10,
        },
      });
      console.log('axios -> then ', result);
    } catch (error) {
      console.log('axios -> catch ', error);
    }
  };
  return (
    <div>
      <h3>列表</h3>
      <Input onChange={changeHandler} value={value} />
    </div>
  );
}
