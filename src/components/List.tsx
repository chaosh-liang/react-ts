import React, { useState } from 'react';
import { Button, Input } from 'antd';
import axios from 'http/axios';
import api from 'http/api';
import { useDebounce } from './common/useDebounce';
import { useEffect } from 'react';

interface Itopics {
  page: number;
  tab: string;
  limit: number;
  value?: string;
}

export default function List() {
  const initParams: Itopics = {
    page: 1,
    tab: 'good',
    limit: 10,
  };
  const [value, setValue] = useState('');
  const [params, setParams] = useState(initParams);

  const fetchList = async (args: Itopics): Promise<void> => {
    const result = await axios.get(api.topics, { params: args });
    console.log('axios -> fetchList ', result);
  };

  const debounceParams = useDebounce(params, 500);

  useEffect(() => {
    console.log('useEffect => fetchList: ', debounceParams);
    fetchList(debounceParams);
  }, [debounceParams]);

  const fetchUserInfo = async (): Promise<void> => {
    const result = await axios.get(`${api.user}/chaosh-liang`);
    console.log('axios -> fetchUserInfo ', result);
  };
  return (
    <div>
      <h3>列表</h3>
      <Input
        value={value}
        onChange={(evt) => {
          setValue(evt.target.value);
          setParams({
            ...params,
            value: evt.target.value,
          });
        }}
      />
      <Button onClick={fetchUserInfo}>用户信息</Button>
    </div>
  );
}
