import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IconArrow } from "../icons";

interface Page {
  isCurrentPage: Boolean;
  title: String;
  to: String;
}

interface BreadCrumbsProps {
  pages: Page[];
}

export const BreadCrumbs = ({
  pages,
  ...props
}: {
  pages: BreadCrumbsProps,
}) => (
  <Box py="0.5rem" px="1.5rem" m="1.5rem" borderRadius="0.5rem" {...props}>
    <Breadcrumb spacing="1rem" separator={<IconArrow size="0.25rem" />}>
      {pages.map((page) => (
        <BreadcrumbItem key={page} isCurrentPage={page.isCurrentPage}>
          <BreadcrumbLink as={Link} to={page.to}>
            {page.isCurrentPage ? <b>{page.title}</b> : <>{page.title}</>}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  </Box>
);
