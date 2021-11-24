import React, { Fragment, useState } from 'react';
import { ADD_DATA } from '../graphql/mutation';
import { useLazyQuery, useQuery } from '@apollo/client';
import { gql, useMutation } from '@apollo/client';
import {
  GET_SERVICES_DATA,
  GET_MASTER,
  GET_CATEGORIES_DATA,
  GET_SERVICES_DATA_ALL
} from '../graphql/queries';
import { Input, Form, Select, Button, Modal } from 'antd';
import { useEffect } from 'react';
export default function ModalMine() {
  const [addData] = useMutation(ADD_DATA);
   const { data: servicesAll } = useQuery(GET_SERVICES_DATA_ALL);
  const { data: master_categories } = useQuery(GET_MASTER);

  const [getCategories, { data: categories, error: cError }] =
    useLazyQuery(GET_CATEGORIES_DATA);

  useEffect(() => {
    getCategories({ variables: { master_category_id: 1 } });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allData, setAllData] = useState({
    id: 1,
    categoryID: 1,
    name: '',
    duration: '',
    price: '',
    inClinic: false,
  });

  //console.log(allData);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (e) => {
    setIsModalVisible(false);
    addData({
      variables: {
        category_id: allData.categoryID,
        service_id: allData.id,
        name: allData.name,
        price: allData.price,
        rating: allData.rating,
        duration: allData.duration,
        in_clinic: allData.inClinic,
      } /*,
      refetchQueries:[{query: GET_SERVICES_DATA,variables:{category_id: categoryId} }]*/,
      update: (cache) => {
        const existing = cache.readQuery({
          query: GET_SERVICES_DATA,
          variables: { category_id: allData.categoryID },
        });
        //console.log(cache);
        if (existing != undefined) {
          cache.writeQuery({
            query: GET_SERVICES_DATA,
            variables: { category_id: allData.categoryID },
            data: {
              services: [...existing.services, addData],
            },
          });
        }
        //console.log(allData.categoryID);
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Fragment>
      <Button type="primary" onClick={showModal}>
        Add Service
      </Button>
      <Modal
        width={250}
        title="Add new service"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Select
            style={{ width: 205}}
            placeholder={'Select master'}
            onChange={(e) => {
              getCategories({
                variables: { master_category_id: e },
              });
            }}
          >
            {master_categories &&
              master_categories.master_categories.map((x) => (
                <Option key={x.id} value={x.id}>
                  {x.name}
                </Option>
              ))}
          </Select>
        </Form>
        <Form>
          <Select
            style={{ width: 205 }}
            placeholder={'Select category'}
            onChange={(e) => {
              setAllData({ ...allData, categoryID: parseInt(e) });
            }}
          >
            {categories &&
              categories.categories.map((x) => (
                <Option key={x.id} value={x.id}>
                  {x.name}
                </Option>
              ))}
          </Select>
        </Form>
        <Form>
          <Input
            style={{ width: 'auto' }}
            placeholder={servicesAll && servicesAll.services.length+2}
            type="number"
            // defaultValue={servicesAll && servicesAll.services.length}
            onChange={(e) => {
              //console.log(e);
              setAllData({ ...allData, id: e.target.value });
            }}
          />
        </Form>
        <Form>
          <Input
            style={{ width: 'auto' }}
            placeholder={'name:'}
            type="text"
            onChange={(e) => {
              setAllData({ ...allData, name: e.target.value });
            }}
          />
        </Form>
        <Form>
          <Input
            style={{ width: 'auto' }}
            placeholder={'price:'}
            type="number"
            onChange={(e) => {
              setAllData({ ...allData, price: e.target.value });
            }}
          />
        </Form>
        <Form>
          <Input
            style={{ width: 'auto' }}
            placeholder={'rating:'}
            type="text"
            onChange={(e) => {
              setAllData({ ...allData, rating: e.target.value });
            }}
          />
        </Form>
        <Form>
          <Input
            style={{ width: 'auto' }}
            placeholder={'duration:'}
            type="text"
            onChange={(e) => {
              setAllData({ ...allData, duration: e.target.value });
            }}
          />
        </Form>
        <Form>
          <Select
            style={{ width: 205}}
            placeholder={'In clinic'}
            onChange={(e) => {
              setAllData({ ...allData, inClinic: e });
            }}
          >
            <Option value="false">False</Option>
            <Option value="true">True</Option>
          </Select>
        </Form>
      </Modal>
    </Fragment>
  );
}
