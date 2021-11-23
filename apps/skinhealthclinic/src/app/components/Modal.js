import React, { Fragment, useState } from 'react';
import { ADD_DATA } from '../graphql/mutation';
import { useLazyQuery, useQuery } from '@apollo/client';
import { gql, useMutation } from '@apollo/client';
import { GET_SERVICES_DATA_ALL, GET_SERVICES_DATA } from '../graphql/queries';
import { Modal, Button } from 'antd';
import { useEffect } from 'react';

export default function ModalMine() {
  const [addData] = useMutation(ADD_DATA);
  const { data: servicesAll } = useQuery(GET_SERVICES_DATA_ALL);

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
    console.log(e);
    console.log('master id :', masterId);
    console.log('category id :', categoryId);
    console.log('id :', id);
    console.log('name :', name);
    console.log('price :', price);
    console.log('rating :', rating);
    console.log('duration :', duration);
    console.log('in_clinic : ', inClinic);

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
      update: (cache, { data }) => {
        const existing = cache.readQuery({
          query: GET_SERVICES_DATA,
          variables: { category_id: categoryId },
        });
        //services = [...services, addData];
        //cache.writeQuery({ query: GET_SERVICES_DATA }, data);
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
          id="master_categories"
          onChange={(e) => {
            setMasterId(e.target.value);
          }}
        >
          <option value="1">Injectables</option>
          <option value="2">Face</option>
          <option value="3">Spa</option>
          <option value="4">Dematology</option>
          <option value="5">Acne treatment</option>
          <option value="6">Hydrafacial</option>
        </select>
        <select
          id="categories"
          onChange={(e) => {
            setCategoryId(e.target.value);
          }}
        >
          <option value="1">Botox</option>
          <option value="2">Filler</option>
          <option value="3">Face Peel</option>
          <option value="4">Microdermabrasion</option>
          <option value="5">Massage</option>
          <option value="6">Facial</option>
          <option value="7">Nail Bar</option>
          <option value="8">skin</option>
          <option value="9">hair</option>
          <option value="10">Spot</option>
          <option value="11">Tweak</option>
          <option value="12">deep-clean</option>
          <option value="13">dryness</option>
        </select>
        <div>
          <label>Id:</label>
          <input
            type="number"
            value={servicesAll && servicesAll.services.length + 2}
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
