import React, { Fragment, useState } from 'react';
import { ADD_DATA } from '../graphql/mutation';
import { useLazyQuery, useQuery } from '@apollo/client';
import { gql, useMutation } from '@apollo/client';
import {
  GET_SERVICES_DATA_ALL,
  GET_SERVICES_DATA,
  GET_MASTER,
  GET_CATEGORIES_DATA,
} from '../graphql/queries';
import { Modal, Button } from 'antd';
import { useEffect } from 'react';

export default function ModalMine() {
  
  const [addData] = useMutation(ADD_DATA);
  const { data: servicesAll } = useQuery(GET_SERVICES_DATA_ALL);

  const [getMaster, { data: master_categories, error: mError }] =
    useLazyQuery(GET_MASTER);

  const [getCategories, { data: categories, error: cError }] =
    useLazyQuery(GET_CATEGORIES_DATA);

  useEffect(() => {
    getMaster();
    getCategories({ variables: { master_category_id: 1 } });
  }, []);
  useEffect(() => {
    if (master_categories) setCategoryId(categoryId);
  }, [categories]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [masterId, setMasterId] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();
  const [duration, setDuration] = useState();
  const [inClinic, setInClinic] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (e) => {
    setIsModalVisible(false);
    addData({
      variables: {
        master_category_id: masterId,
        category_id: categoryId,
        service_id: id,
        name: name,
        price: price,
        rating: rating,
        duration: duration,
        in_clinic: inClinic,
      } /*,
      refetchQueries:[{query: GET_SERVICES_DATA,variables:{category_id: categoryId} }]*/,
      update: (cache) => {
        const existing = cache.readQuery({
          query: GET_SERVICES_DATA,
          variables: { category_id: categoryId },
        });
        if (existing) {
          cache.writeQuery({
            query: GET_SERVICES_DATA,
            variables: { category_id: categoryId },
            data: {
              services: [...existing.services, addData],
            },
          });
        }
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Fragment>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setMasterId(e.target.value);
            getCategories({
              variables: { master_category_id: e.target.value },
            });
          }}
        >
          {master_categories &&
            master_categories.master_categories.map((x) => (
              <option key={x.id} value={x.id}>{x.name}</option>
            ))}
        </select>

        <select
          onChange={(e) => {
            console.log(e.target.value);
            console.log(e.target.value);
            setCategoryId(e.target.value)
          }}
        >
          {categories &&
            categories.categories.map((x) => (
              <option key={x.id} value={x.id}>{x.name}</option>
            ))}
        </select>

        <div>
          <label>Id:</label>
          <input
            type="number"
            defaultValue={servicesAll && servicesAll.services.length}
            onChange={(e) => {
              console.log(e);
              setId(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Service name</label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Rating</label>
          <input
            type="text"
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Duration</label>
          <input
            type="text"
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
        </div>
        <div>
          <label>In_Clinic</label>
          <select
            id="in_clinic"
            onChange={(e) => {
              setInClinic(e.target.value);
            }}
          >
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        </div>
      </Modal>
    </Fragment>
  );
}
