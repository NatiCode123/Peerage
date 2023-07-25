import { useState } from "react";
import { useSelector, useDispatch } from "../store/index";
import { add, remove } from "../store/reducers/tree";
import "../App.css";
import "../index.css";
import React from 'react';
import Tree from 'react-d3-tree';

const TreeNode = ({ data, removeNode }: any) => {
  const dispatch = useDispatch();
  const [newLeafName, setNewLeafName] = useState("");

  const handleAddLeaf = (event: any) => {
    event.preventDefault();
    dispatch(add({ newLeafName, parentName: data.name }));
    setNewLeafName("");
  };

  return (
    <li style={{ marginBottom: "10px", marginLeft: "25px" }}>
      <div className="flex items-center">
        <div className="w-4 h-4 rounded-full bg-gray-500 mr-2"></div>
        <div className="text-sm font-medium text-gray-900">{data.name}</div>
        <button
          className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          onClick={() => removeNode(data.id)}
        >
          REMOVE
        </button>
      </div>
      {data.children && (
        <ul className="ml-4" style={{ marginTop: "10px" }}>
          {data.children.map((child: any) => (
            <TreeNode key={child.id} data={child} removeNode={removeNode} />
          ))}
          <li>
            <form onSubmit={handleAddLeaf} className="flex items-center">
              <label className="mr-2">{data.name} employee:</label>
              <input
                type="text"
                className="border border-gray-500 px-2 py-1 rounded mr-2"
                value={newLeafName}
                onChange={(event) => setNewLeafName(event.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Add
              </button>
            </form>
          </li>
        </ul>
      )}
    </li>
  );
};

const CompanyTree = ({ data, removeNode }: any) => {
  return (
    <ul className="sub-tree">
      <TreeNode data={data} removeNode={removeNode} />
    </ul>
  );
};

const MainTree = () => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const removeNode = (id: any) => {
    dispatch(remove({ id }));
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold my-4 text-center">Company Tree</h1>
      <CompanyTree data={data} removeNode={removeNode} />
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tree data={data}/>
      </div>
    </div>
  );
};

export default MainTree;