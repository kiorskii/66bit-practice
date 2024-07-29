import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import graphqlClient from "./graphqlClient";
import { gql } from "graphql-request";

const GET_SUPPLIERS_QUERY = gql`
  query GetSuppliers {
    suppliers {
      id
      name
      phoneNumber
      email
      inn
      webSite
      updatedAt
      isBlocked
      status
      city {
        id
        name
      }
      meta {
        id
        key
        value
      }
    }
  }
`;

const ADD_SUPPLIER_MUTATION = gql`
  mutation AddSupplier($addSupplierInput: SupplierAddInput!) {
    addSupplier(input: $addSupplierInput) {
      id
      name
      phoneNumber
      email
      inn
      city {
        id
        name
      }
      meta {
        id
        key
        value
      }
      updatedAt
    }
  }
`;

const PATCH_SUPPLIER_MUTATION = gql`
  mutation PatchSupplier($supplierPatchInput: SupplierPatchInput!) {
    patchSupplier(input: $supplierPatchInput) {
      id
      name
      phoneNumber
      email
      inn
      city {
        id
        name
      }
      meta {
        id
        key
        value
      }
      updatedAt
    }
  }
`;

const SET_IS_BLOCKED_MUTATION = gql`
  mutation SetIsBlocked($id: Int!, $isBlocked: Boolean!) {
    setIsBlockedSupplier(input: { id: $id, isBlocked: $isBlocked }) {
      id
      name
      isBlocked
    }
  }
`;

const setIsBlockedSupplier = async ({ id, isBlocked }) => {
  const variables = { id, isBlocked };
  const data = await graphqlClient.request(SET_IS_BLOCKED_MUTATION, variables);
  return data.setIsBlockedSupplier;
};

export const useSetIsBlockedSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setIsBlockedSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries(["suppliers"]);
    },
  });
};

const fetchSuppliers = async () => {
  const data = await graphqlClient.request(GET_SUPPLIERS_QUERY);
  return data.suppliers;
};

const addSupplier = async (newSupplier) => {
  const variables = { addSupplierInput: newSupplier };
  const data = await graphqlClient.request(ADD_SUPPLIER_MUTATION, variables);
  return data.addSupplier;
};

const patchSupplier = async (supplierPatchInput) => {
  const variables = { supplierPatchInput };
  const data = await graphqlClient.request(PATCH_SUPPLIER_MUTATION, variables);
  return data.patchSupplier;
};

export const useSuppliers = () => {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: fetchSuppliers,
  });
};

export const useAddSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries(["suppliers"]);
    },
  });
};

export const usePatchSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries(["suppliers"]);
    },
  });
};
