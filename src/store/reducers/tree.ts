import { createSlice } from "@reduxjs/toolkit";

// import { dispatch } from "../index";
import { v4 as uuidv4 } from "uuid";

const initialData = {
  id: uuidv4(),
  name: "CEO",
  parent: null,
  children: [
    {
      id: uuidv4(),
      name: "CTO",
      parent: "CEO",
      children: [
        {
          id: uuidv4(),
          name: "Project Manager",
          parent: "CTO",
          children: [
            {
              id: uuidv4(),
              name: "Product Owner",
              parent: "Project Manager",
              children: [
                {
                  id: uuidv4(),
                  name: "Tech Lead",
                  parent: "Product Owner",
                  children: [
                    {
                      id: uuidv4(),
                      name: "Frontend Developer",
                      parent: "Tech Lead",
                    },
                    {
                      id: uuidv4(),
                      name: "Backend Developer",
                      parent: "Tech Lead",
                    },
                    {
                      id: uuidv4(),
                      name: "DevOps Engineer",
                      parent: "Tech Lead",
                    },
                  ],
                },
                {
                  id: uuidv4(),
                  name: "QA Engineer",
                  parent: "Product Owner",
                },
                {
                  id: uuidv4(),
                  name: "Scrum Master",
                  parent: "Product Owner",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      name: "CFO",
      parent: "CEO",
      children: [
        {
          id: uuidv4(),
          name: "Chef Accountant",
          parent: "CFO",
          children: [
            {
              id: uuidv4(),
              name: "Financial Analyst",
              parent: "Chef Accountant",
            },
            {
              id: uuidv4(),
              name: "Account and Payable",
              parent: "Chef Accountant",
            },
          ],
        },
        {
          id: uuidv4(),
          name: "Internal Relation",
          parent: "CFO",
        },
      ],
    },
    {
      id: uuidv4(),
      name: "COO",
      parent: "CEO",
      children: [
        {
          id: uuidv4(),
          name: "Project Manager",
          parent: "COO",
        },
        {
          id: uuidv4(),
          name: "Operation Manager",
          parent: "COO",
        },
        {
          id: uuidv4(),
          name: "Customer Relation",
          parent: "COO",
        },
      ],
    },
    {
      id: uuidv4(),
      name: "HR",
      parent: "CEO",
      children: [],
    },
  ],
};

const slice = createSlice({
  name: "tree",
  initialState: initialData,
  reducers: {
    add(state, action) {
      const addLeafHelper = (node: any) => {
        if (node.name === action.payload.parentName) {
          const newLeaf = {
            id: uuidv4(),
            name: action.payload.newLeafName,
            parent: action.payload.parentName,
            children: [],
          };
          node.children.push(newLeaf);
          return { ...state };
        } else if (node.children) {
          node.children.forEach((child: any) => {
            addLeafHelper(child);
          });
        }
      };
      addLeafHelper(state);
    },
    remove(state, action) {
      const removeNodeHelper = (node: any) => {
        if (node.children) {
          node.children.forEach((child: any, index: any) => {
            if (child.id === action.payload.id) {
              node.children.splice(index, 1);
              return { ...state };
            } else {
              removeNodeHelper(child);
            }
          });
        }
      };

      removeNodeHelper(state);
    },
  },
});

// Reducer
export default slice.reducer;
export const { add, remove } = slice.actions;
