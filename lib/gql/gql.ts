import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** columns and relationships of "Article" */
export type Article = {
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  postId?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  /** An object relationship */
  user: Users;
  userId: Scalars['String']['output'];
};

/** aggregated selection of "Article" */
export type Article_Aggregate = {
  aggregate?: Maybe<Article_Aggregate_Fields>;
  nodes: Array<Article>;
};

/** aggregate fields of "Article" */
export type Article_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Article_Max_Fields>;
  min?: Maybe<Article_Min_Fields>;
};


/** aggregate fields of "Article" */
export type Article_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Article_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "Article". All fields are combined with a logical 'AND'. */
export type Article_Bool_Exp = {
  _and?: InputMaybe<Array<Article_Bool_Exp>>;
  _not?: InputMaybe<Article_Bool_Exp>;
  _or?: InputMaybe<Array<Article_Bool_Exp>>;
  content?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  postId?: InputMaybe<String_Comparison_Exp>;
  thumbnail?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Article" */
export type Article_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'Article_pkey';

/** input type for inserting data into table "Article" */
export type Article_Insert_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Article_Max_Fields = {
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  postId?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Article_Min_Fields = {
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  postId?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "Article" */
export type Article_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Article>;
};

/** on_conflict condition type for table "Article" */
export type Article_On_Conflict = {
  constraint: Article_Constraint;
  update_columns?: Array<Article_Update_Column>;
  where?: InputMaybe<Article_Bool_Exp>;
};

/** Ordering options when selecting data from "Article". */
export type Article_Order_By = {
  content?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  postId?: InputMaybe<Order_By>;
  thumbnail?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Article */
export type Article_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "Article" */
export type Article_Select_Column =
  /** column name */
  | 'content'
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'postId'
  /** column name */
  | 'thumbnail'
  /** column name */
  | 'title'
  /** column name */
  | 'userId';

/** input type for updating data in table "Article" */
export type Article_Set_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "Article" */
export type Article_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Article_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Article_Stream_Cursor_Value_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "Article" */
export type Article_Update_Column =
  /** column name */
  | 'content'
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'postId'
  /** column name */
  | 'thumbnail'
  /** column name */
  | 'title'
  /** column name */
  | 'userId';

export type Article_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Article_Set_Input>;
  /** filter the rows which have to be updated */
  where: Article_Bool_Exp;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** ordering argument of a cursor */
export type Cursor_Ordering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

/** mutation root */
export type Mutation_Root = {
  /** delete data from the table: "Article" */
  delete_Article?: Maybe<Article_Mutation_Response>;
  /** delete single row from the table: "Article" */
  delete_Article_by_pk?: Maybe<Article>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "Article" */
  insert_Article?: Maybe<Article_Mutation_Response>;
  /** insert a single row into the table: "Article" */
  insert_Article_one?: Maybe<Article>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "Article" */
  update_Article?: Maybe<Article_Mutation_Response>;
  /** update single row of the table: "Article" */
  update_Article_by_pk?: Maybe<Article>;
  /** update multiples rows of table: "Article" */
  update_Article_many?: Maybe<Array<Maybe<Article_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_ArticleArgs = {
  where: Article_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Article_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootInsert_ArticleArgs = {
  objects: Array<Article_Insert_Input>;
  on_conflict?: InputMaybe<Article_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Article_OneArgs = {
  object: Article_Insert_Input;
  on_conflict?: InputMaybe<Article_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ArticleArgs = {
  _set?: InputMaybe<Article_Set_Input>;
  where: Article_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Article_By_PkArgs = {
  _set?: InputMaybe<Article_Set_Input>;
  pk_columns: Article_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Article_ManyArgs = {
  updates: Array<Article_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};

/** column ordering options */
export type Order_By =
  /** in ascending order, nulls last */
  | 'asc'
  /** in ascending order, nulls first */
  | 'asc_nulls_first'
  /** in ascending order, nulls last */
  | 'asc_nulls_last'
  /** in descending order, nulls first */
  | 'desc'
  /** in descending order, nulls first */
  | 'desc_nulls_first'
  /** in descending order, nulls last */
  | 'desc_nulls_last';

export type Query_Root = {
  /** fetch data from the table: "Article" */
  Article: Array<Article>;
  /** fetch aggregated fields from the table: "Article" */
  Article_aggregate: Article_Aggregate;
  /** fetch data from the table: "Article" using primary key columns */
  Article_by_pk?: Maybe<Article>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootArticleArgs = {
  distinct_on?: InputMaybe<Array<Article_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Order_By>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


export type Query_RootArticle_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Article_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Order_By>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


export type Query_RootArticle_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_Root = {
  /** fetch data from the table: "Article" */
  Article: Array<Article>;
  /** fetch aggregated fields from the table: "Article" */
  Article_aggregate: Article_Aggregate;
  /** fetch data from the table: "Article" using primary key columns */
  Article_by_pk?: Maybe<Article>;
  /** fetch data from the table in a streaming manner: "Article" */
  Article_stream: Array<Article>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
};


export type Subscription_RootArticleArgs = {
  distinct_on?: InputMaybe<Array<Article_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Order_By>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


export type Subscription_RootArticle_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Article_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Article_Order_By>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


export type Subscription_RootArticle_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootArticle_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Article_Stream_Cursor_Input>>;
  where?: InputMaybe<Article_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "users" */
export type Users = {
  id: Scalars['String']['output'];
  last_seen: Scalars['timestamptz']['output'];
  name: Scalars['String']['output'];
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_seen?: InputMaybe<Timestamptz_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export type Users_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'users_pkey';

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  last_seen?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  id?: Maybe<Scalars['String']['output']>;
  last_seen?: Maybe<Scalars['timestamptz']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  id?: Maybe<Scalars['String']['output']>;
  last_seen?: Maybe<Scalars['timestamptz']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  id?: InputMaybe<Order_By>;
  last_seen?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "users" */
export type Users_Select_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'last_seen'
  /** column name */
  | 'name';

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  last_seen?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  last_seen?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "users" */
export type Users_Update_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'last_seen'
  /** column name */
  | 'name';

export type Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type ArticlesQueryVariables = Exact<{
  createdAt?: InputMaybe<Order_By>;
}>;


export type ArticlesQuery = { Article: Array<{ id: any, thumbnail?: string | null, title: string, createdAt?: any | null, content: string }> };

export type ArticleByPkQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']['input']>;
}>;


export type ArticleByPkQuery = { Article_by_pk?: { content: string, createdAt?: any | null, id: any, thumbnail?: string | null, title: string, postId?: string | null } | null };

export type InsertArticleMutationVariables = Exact<{
  content?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
}>;


export type InsertArticleMutation = { insert_Article?: { returning: Array<{ id: any }> } | null };

export type UpdateArticleByPkMutationVariables = Exact<{
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateArticleByPkMutation = { update_Article_by_pk?: { content: string, createdAt?: any | null, id: any, postId?: string | null, thumbnail?: string | null, title: string } | null };

export type DeleteArticleByPkMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']['input']>;
}>;


export type DeleteArticleByPkMutation = { delete_Article_by_pk?: { id: any } | null };


export const ArticlesDocument = gql`
    query Articles($createdAt: order_by = desc) {
  Article(order_by: {createdAt: $createdAt}) {
    id
    thumbnail
    title
    createdAt
    content
  }
}
    `;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *      createdAt: // value for 'createdAt'
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<ArticlesQuery, ArticlesQueryVariables>;
export const ArticleByPkDocument = gql`
    query ArticleByPk($id: uuid = "") {
  Article_by_pk(id: $id) {
    content
    createdAt
    id
    thumbnail
    title
    postId
  }
}
    `;

/**
 * __useArticleByPkQuery__
 *
 * To run a query within a React component, call `useArticleByPkQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleByPkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleByPkQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArticleByPkQuery(baseOptions?: Apollo.QueryHookOptions<ArticleByPkQuery, ArticleByPkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleByPkQuery, ArticleByPkQueryVariables>(ArticleByPkDocument, options);
      }
export function useArticleByPkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleByPkQuery, ArticleByPkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleByPkQuery, ArticleByPkQueryVariables>(ArticleByPkDocument, options);
        }
export type ArticleByPkQueryHookResult = ReturnType<typeof useArticleByPkQuery>;
export type ArticleByPkLazyQueryHookResult = ReturnType<typeof useArticleByPkLazyQuery>;
export type ArticleByPkQueryResult = Apollo.QueryResult<ArticleByPkQuery, ArticleByPkQueryVariables>;
export const InsertArticleDocument = gql`
    mutation insertArticle($content: String = "", $thumbnail: String = "", $title: String = "", $userId: String = "", $postId: String = "") {
  insert_Article(
    objects: {content: $content, thumbnail: $thumbnail, title: $title, userId: $userId, postId: $postId}
  ) {
    returning {
      id
    }
  }
}
    `;
export type InsertArticleMutationFn = Apollo.MutationFunction<InsertArticleMutation, InsertArticleMutationVariables>;

/**
 * __useInsertArticleMutation__
 *
 * To run a mutation, you first call `useInsertArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertArticleMutation, { data, loading, error }] = useInsertArticleMutation({
 *   variables: {
 *      content: // value for 'content'
 *      thumbnail: // value for 'thumbnail'
 *      title: // value for 'title'
 *      userId: // value for 'userId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useInsertArticleMutation(baseOptions?: Apollo.MutationHookOptions<InsertArticleMutation, InsertArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertArticleMutation, InsertArticleMutationVariables>(InsertArticleDocument, options);
      }
export type InsertArticleMutationHookResult = ReturnType<typeof useInsertArticleMutation>;
export type InsertArticleMutationResult = Apollo.MutationResult<InsertArticleMutation>;
export type InsertArticleMutationOptions = Apollo.BaseMutationOptions<InsertArticleMutation, InsertArticleMutationVariables>;
export const UpdateArticleByPkDocument = gql`
    mutation updateArticleByPk($content: String = "", $title: String = "", $id: uuid = "", $postId: String = "") {
  update_Article_by_pk(
    pk_columns: {id: $id}
    _set: {content: $content, title: $title, postId: $postId}
  ) {
    content
    createdAt
    id
    postId
    thumbnail
    title
  }
}
    `;
export type UpdateArticleByPkMutationFn = Apollo.MutationFunction<UpdateArticleByPkMutation, UpdateArticleByPkMutationVariables>;

/**
 * __useUpdateArticleByPkMutation__
 *
 * To run a mutation, you first call `useUpdateArticleByPkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleByPkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleByPkMutation, { data, loading, error }] = useUpdateArticleByPkMutation({
 *   variables: {
 *      content: // value for 'content'
 *      title: // value for 'title'
 *      id: // value for 'id'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUpdateArticleByPkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleByPkMutation, UpdateArticleByPkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArticleByPkMutation, UpdateArticleByPkMutationVariables>(UpdateArticleByPkDocument, options);
      }
export type UpdateArticleByPkMutationHookResult = ReturnType<typeof useUpdateArticleByPkMutation>;
export type UpdateArticleByPkMutationResult = Apollo.MutationResult<UpdateArticleByPkMutation>;
export type UpdateArticleByPkMutationOptions = Apollo.BaseMutationOptions<UpdateArticleByPkMutation, UpdateArticleByPkMutationVariables>;
export const DeleteArticleByPkDocument = gql`
    mutation deleteArticleByPk($id: uuid = "") {
  delete_Article_by_pk(id: $id) {
    id
  }
}
    `;
export type DeleteArticleByPkMutationFn = Apollo.MutationFunction<DeleteArticleByPkMutation, DeleteArticleByPkMutationVariables>;

/**
 * __useDeleteArticleByPkMutation__
 *
 * To run a mutation, you first call `useDeleteArticleByPkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleByPkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleByPkMutation, { data, loading, error }] = useDeleteArticleByPkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleByPkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArticleByPkMutation, DeleteArticleByPkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArticleByPkMutation, DeleteArticleByPkMutationVariables>(DeleteArticleByPkDocument, options);
      }
export type DeleteArticleByPkMutationHookResult = ReturnType<typeof useDeleteArticleByPkMutation>;
export type DeleteArticleByPkMutationResult = Apollo.MutationResult<DeleteArticleByPkMutation>;
export type DeleteArticleByPkMutationOptions = Apollo.BaseMutationOptions<DeleteArticleByPkMutation, DeleteArticleByPkMutationVariables>;