import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
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
  BigInt: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
};

export type AccountType = {
  __typename?: 'AccountType';
  _count?: Maybe<AccountTypeCount>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['BigInt']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  users: Array<User>;
  uuid: Scalars['String']['output'];
};


export type AccountTypeUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};

export type AccountTypeAvgAggregate = {
  __typename?: 'AccountTypeAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  roleId?: Maybe<Scalars['Float']['output']>;
};

export type AccountTypeAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
};

export type AccountTypeCount = {
  __typename?: 'AccountTypeCount';
  users: Scalars['Int']['output'];
};

export type AccountTypeCountAggregate = {
  __typename?: 'AccountTypeCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  roleId: Scalars['Int']['output'];
  title: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type AccountTypeCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type AccountTypeCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  role?: InputMaybe<RoleCreateNestedOneWithoutAccountTypesInput>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  users?: InputMaybe<UserCreateNestedManyWithoutAccountTypeInput>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type AccountTypeCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  roleId?: InputMaybe<Scalars['BigInt']['input']>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type AccountTypeCreateManyRoleInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type AccountTypeCreateManyRoleInputEnvelope = {
  data: Array<AccountTypeCreateManyRoleInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AccountTypeCreateNestedManyWithoutRoleInput = {
  connect?: InputMaybe<Array<AccountTypeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AccountTypeCreateOrConnectWithoutRoleInput>>;
  create?: InputMaybe<Array<AccountTypeCreateWithoutRoleInput>>;
  createMany?: InputMaybe<AccountTypeCreateManyRoleInputEnvelope>;
};

export type AccountTypeCreateNestedOneWithoutUsersInput = {
  connect?: InputMaybe<AccountTypeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountTypeCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<AccountTypeCreateWithoutUsersInput>;
};

export type AccountTypeCreateOrConnectWithoutRoleInput = {
  create: AccountTypeCreateWithoutRoleInput;
  where: AccountTypeWhereUniqueInput;
};

export type AccountTypeCreateOrConnectWithoutUsersInput = {
  create: AccountTypeCreateWithoutUsersInput;
  where: AccountTypeWhereUniqueInput;
};

export type AccountTypeCreateWithoutRoleInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  users?: InputMaybe<UserCreateNestedManyWithoutAccountTypeInput>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type AccountTypeCreateWithoutUsersInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  role?: InputMaybe<RoleCreateNestedOneWithoutAccountTypesInput>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type AccountTypeGroupBy = {
  __typename?: 'AccountTypeGroupBy';
  _avg?: Maybe<AccountTypeAvgAggregate>;
  _count?: Maybe<AccountTypeCountAggregate>;
  _max?: Maybe<AccountTypeMaxAggregate>;
  _min?: Maybe<AccountTypeMinAggregate>;
  _sum?: Maybe<AccountTypeSumAggregate>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  roleId?: Maybe<Scalars['BigInt']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type AccountTypeListRelationFilter = {
  every?: InputMaybe<AccountTypeWhereInput>;
  none?: InputMaybe<AccountTypeWhereInput>;
  some?: InputMaybe<AccountTypeWhereInput>;
};

export type AccountTypeMaxAggregate = {
  __typename?: 'AccountTypeMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  roleId?: Maybe<Scalars['BigInt']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type AccountTypeMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type AccountTypeMinAggregate = {
  __typename?: 'AccountTypeMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  roleId?: Maybe<Scalars['BigInt']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type AccountTypeMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type AccountTypeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AccountTypeOrderByWithAggregationInput = {
  _avg?: InputMaybe<AccountTypeAvgOrderByAggregateInput>;
  _count?: InputMaybe<AccountTypeCountOrderByAggregateInput>;
  _max?: InputMaybe<AccountTypeMaxOrderByAggregateInput>;
  _min?: InputMaybe<AccountTypeMinOrderByAggregateInput>;
  _sum?: InputMaybe<AccountTypeSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type AccountTypeOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  role?: InputMaybe<RoleOrderByWithRelationInput>;
  roleId?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
  uuid?: InputMaybe<SortOrder>;
};

export type AccountTypeRelationFilter = {
  is?: InputMaybe<AccountTypeWhereInput>;
  isNot?: InputMaybe<AccountTypeWhereInput>;
};

export enum AccountTypeScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  RoleId = 'roleId',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  Uuid = 'uuid'
}

export type AccountTypeScalarWhereInput = {
  AND?: InputMaybe<Array<AccountTypeScalarWhereInput>>;
  NOT?: InputMaybe<Array<AccountTypeScalarWhereInput>>;
  OR?: InputMaybe<Array<AccountTypeScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  roleId?: InputMaybe<BigIntNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type AccountTypeScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<AccountTypeScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<AccountTypeScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<AccountTypeScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  roleId?: InputMaybe<BigIntNullableWithAggregatesFilter>;
  title?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
};

export type AccountTypeSumAggregate = {
  __typename?: 'AccountTypeSumAggregate';
  id?: Maybe<Scalars['BigInt']['output']>;
  roleId?: Maybe<Scalars['BigInt']['output']>;
};

export type AccountTypeSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
};

export type AccountTypeUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  role?: InputMaybe<RoleUpdateOneWithoutAccountTypesNestedInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutAccountTypeNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AccountTypeUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AccountTypeUpdateManyWithWhereWithoutRoleInput = {
  data: AccountTypeUpdateManyMutationInput;
  where: AccountTypeScalarWhereInput;
};

export type AccountTypeUpdateManyWithoutRoleNestedInput = {
  connect?: InputMaybe<Array<AccountTypeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AccountTypeCreateOrConnectWithoutRoleInput>>;
  create?: InputMaybe<Array<AccountTypeCreateWithoutRoleInput>>;
  createMany?: InputMaybe<AccountTypeCreateManyRoleInputEnvelope>;
  delete?: InputMaybe<Array<AccountTypeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AccountTypeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AccountTypeWhereUniqueInput>>;
  set?: InputMaybe<Array<AccountTypeWhereUniqueInput>>;
  update?: InputMaybe<Array<AccountTypeUpdateWithWhereUniqueWithoutRoleInput>>;
  updateMany?: InputMaybe<Array<AccountTypeUpdateManyWithWhereWithoutRoleInput>>;
  upsert?: InputMaybe<Array<AccountTypeUpsertWithWhereUniqueWithoutRoleInput>>;
};

export type AccountTypeUpdateOneRequiredWithoutUsersNestedInput = {
  connect?: InputMaybe<AccountTypeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountTypeCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<AccountTypeCreateWithoutUsersInput>;
  update?: InputMaybe<AccountTypeUpdateWithoutUsersInput>;
  upsert?: InputMaybe<AccountTypeUpsertWithoutUsersInput>;
};

export type AccountTypeUpdateWithWhereUniqueWithoutRoleInput = {
  data: AccountTypeUpdateWithoutRoleInput;
  where: AccountTypeWhereUniqueInput;
};

export type AccountTypeUpdateWithoutRoleInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutAccountTypeNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AccountTypeUpdateWithoutUsersInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  role?: InputMaybe<RoleUpdateOneWithoutAccountTypesNestedInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AccountTypeUpsertWithWhereUniqueWithoutRoleInput = {
  create: AccountTypeCreateWithoutRoleInput;
  update: AccountTypeUpdateWithoutRoleInput;
  where: AccountTypeWhereUniqueInput;
};

export type AccountTypeUpsertWithoutUsersInput = {
  create: AccountTypeCreateWithoutUsersInput;
  update: AccountTypeUpdateWithoutUsersInput;
};

export type AccountTypeWhereInput = {
  AND?: InputMaybe<Array<AccountTypeWhereInput>>;
  NOT?: InputMaybe<Array<AccountTypeWhereInput>>;
  OR?: InputMaybe<Array<AccountTypeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  role?: InputMaybe<RoleRelationFilter>;
  roleId?: InputMaybe<BigIntNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  users?: InputMaybe<UserListRelationFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type AccountTypeWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type AffectedRowsOutput = {
  __typename?: 'AffectedRowsOutput';
  count: Scalars['Int']['output'];
};

export type AggregateAccountType = {
  __typename?: 'AggregateAccountType';
  _avg?: Maybe<AccountTypeAvgAggregate>;
  _count?: Maybe<AccountTypeCountAggregate>;
  _max?: Maybe<AccountTypeMaxAggregate>;
  _min?: Maybe<AccountTypeMinAggregate>;
  _sum?: Maybe<AccountTypeSumAggregate>;
};

export type AggregateAthleteProfile = {
  __typename?: 'AggregateAthleteProfile';
  _avg?: Maybe<AthleteProfileAvgAggregate>;
  _count?: Maybe<AthleteProfileCountAggregate>;
  _max?: Maybe<AthleteProfileMaxAggregate>;
  _min?: Maybe<AthleteProfileMinAggregate>;
  _sum?: Maybe<AthleteProfileSumAggregate>;
};

export type AggregateBlocks = {
  __typename?: 'AggregateBlocks';
  _avg?: Maybe<BlocksAvgAggregate>;
  _count?: Maybe<BlocksCountAggregate>;
  _max?: Maybe<BlocksMaxAggregate>;
  _min?: Maybe<BlocksMinAggregate>;
  _sum?: Maybe<BlocksSumAggregate>;
};

export type AggregateCoachProfile = {
  __typename?: 'AggregateCoachProfile';
  _avg?: Maybe<CoachProfileAvgAggregate>;
  _count?: Maybe<CoachProfileCountAggregate>;
  _max?: Maybe<CoachProfileMaxAggregate>;
  _min?: Maybe<CoachProfileMinAggregate>;
  _sum?: Maybe<CoachProfileSumAggregate>;
};

export type AggregateComment = {
  __typename?: 'AggregateComment';
  _avg?: Maybe<CommentAvgAggregate>;
  _count?: Maybe<CommentCountAggregate>;
  _max?: Maybe<CommentMaxAggregate>;
  _min?: Maybe<CommentMinAggregate>;
  _sum?: Maybe<CommentSumAggregate>;
};

export type AggregateCommentLike = {
  __typename?: 'AggregateCommentLike';
  _avg?: Maybe<CommentLikeAvgAggregate>;
  _count?: Maybe<CommentLikeCountAggregate>;
  _max?: Maybe<CommentLikeMaxAggregate>;
  _min?: Maybe<CommentLikeMinAggregate>;
  _sum?: Maybe<CommentLikeSumAggregate>;
};

export type AggregateCountry = {
  __typename?: 'AggregateCountry';
  _avg?: Maybe<CountryAvgAggregate>;
  _count?: Maybe<CountryCountAggregate>;
  _max?: Maybe<CountryMaxAggregate>;
  _min?: Maybe<CountryMinAggregate>;
  _sum?: Maybe<CountrySumAggregate>;
};

export type AggregateEvaluation = {
  __typename?: 'AggregateEvaluation';
  _avg?: Maybe<EvaluationAvgAggregate>;
  _count?: Maybe<EvaluationCountAggregate>;
  _max?: Maybe<EvaluationMaxAggregate>;
  _min?: Maybe<EvaluationMinAggregate>;
  _sum?: Maybe<EvaluationSumAggregate>;
};

export type AggregateFollows = {
  __typename?: 'AggregateFollows';
  _avg?: Maybe<FollowsAvgAggregate>;
  _count?: Maybe<FollowsCountAggregate>;
  _max?: Maybe<FollowsMaxAggregate>;
  _min?: Maybe<FollowsMinAggregate>;
  _sum?: Maybe<FollowsSumAggregate>;
};

export type AggregateInterestedSchools = {
  __typename?: 'AggregateInterestedSchools';
  _avg?: Maybe<InterestedSchoolsAvgAggregate>;
  _count?: Maybe<InterestedSchoolsCountAggregate>;
  _max?: Maybe<InterestedSchoolsMaxAggregate>;
  _min?: Maybe<InterestedSchoolsMinAggregate>;
  _sum?: Maybe<InterestedSchoolsSumAggregate>;
};

export type AggregatePosition = {
  __typename?: 'AggregatePosition';
  _avg?: Maybe<PositionAvgAggregate>;
  _count?: Maybe<PositionCountAggregate>;
  _max?: Maybe<PositionMaxAggregate>;
  _min?: Maybe<PositionMinAggregate>;
  _sum?: Maybe<PositionSumAggregate>;
};

export type AggregatePositionCategory = {
  __typename?: 'AggregatePositionCategory';
  _avg?: Maybe<PositionCategoryAvgAggregate>;
  _count?: Maybe<PositionCategoryCountAggregate>;
  _max?: Maybe<PositionCategoryMaxAggregate>;
  _min?: Maybe<PositionCategoryMinAggregate>;
  _sum?: Maybe<PositionCategorySumAggregate>;
};

export type AggregatePost = {
  __typename?: 'AggregatePost';
  _avg?: Maybe<PostAvgAggregate>;
  _count?: Maybe<PostCountAggregate>;
  _max?: Maybe<PostMaxAggregate>;
  _min?: Maybe<PostMinAggregate>;
  _sum?: Maybe<PostSumAggregate>;
};

export type AggregatePostFlag = {
  __typename?: 'AggregatePostFlag';
  _avg?: Maybe<PostFlagAvgAggregate>;
  _count?: Maybe<PostFlagCountAggregate>;
  _max?: Maybe<PostFlagMaxAggregate>;
  _min?: Maybe<PostFlagMinAggregate>;
  _sum?: Maybe<PostFlagSumAggregate>;
};

export type AggregatePostLike = {
  __typename?: 'AggregatePostLike';
  _avg?: Maybe<PostLikeAvgAggregate>;
  _count?: Maybe<PostLikeCountAggregate>;
  _max?: Maybe<PostLikeMaxAggregate>;
  _min?: Maybe<PostLikeMinAggregate>;
  _sum?: Maybe<PostLikeSumAggregate>;
};

export type AggregateProspectedAthlete = {
  __typename?: 'AggregateProspectedAthlete';
  _avg?: Maybe<ProspectedAthleteAvgAggregate>;
  _count?: Maybe<ProspectedAthleteCountAggregate>;
  _max?: Maybe<ProspectedAthleteMaxAggregate>;
  _min?: Maybe<ProspectedAthleteMinAggregate>;
  _sum?: Maybe<ProspectedAthleteSumAggregate>;
};

export type AggregateRecruitedAthlete = {
  __typename?: 'AggregateRecruitedAthlete';
  _avg?: Maybe<RecruitedAthleteAvgAggregate>;
  _count?: Maybe<RecruitedAthleteCountAggregate>;
  _max?: Maybe<RecruitedAthleteMaxAggregate>;
  _min?: Maybe<RecruitedAthleteMinAggregate>;
  _sum?: Maybe<RecruitedAthleteSumAggregate>;
};

export type AggregateRole = {
  __typename?: 'AggregateRole';
  _avg?: Maybe<RoleAvgAggregate>;
  _count?: Maybe<RoleCountAggregate>;
  _max?: Maybe<RoleMaxAggregate>;
  _min?: Maybe<RoleMinAggregate>;
  _sum?: Maybe<RoleSumAggregate>;
};

export type AggregateSchool = {
  __typename?: 'AggregateSchool';
  _avg?: Maybe<SchoolAvgAggregate>;
  _count?: Maybe<SchoolCountAggregate>;
  _max?: Maybe<SchoolMaxAggregate>;
  _min?: Maybe<SchoolMinAggregate>;
  _sum?: Maybe<SchoolSumAggregate>;
};

export type AggregateSchoolType = {
  __typename?: 'AggregateSchoolType';
  _avg?: Maybe<SchoolTypeAvgAggregate>;
  _count?: Maybe<SchoolTypeCountAggregate>;
  _max?: Maybe<SchoolTypeMaxAggregate>;
  _min?: Maybe<SchoolTypeMinAggregate>;
  _sum?: Maybe<SchoolTypeSumAggregate>;
};

export type AggregateSkillType = {
  __typename?: 'AggregateSkillType';
  _avg?: Maybe<SkillTypeAvgAggregate>;
  _count?: Maybe<SkillTypeCountAggregate>;
  _max?: Maybe<SkillTypeMaxAggregate>;
  _min?: Maybe<SkillTypeMinAggregate>;
  _sum?: Maybe<SkillTypeSumAggregate>;
};

export type AggregateSkills = {
  __typename?: 'AggregateSkills';
  _avg?: Maybe<SkillsAvgAggregate>;
  _count?: Maybe<SkillsCountAggregate>;
  _max?: Maybe<SkillsMaxAggregate>;
  _min?: Maybe<SkillsMinAggregate>;
  _sum?: Maybe<SkillsSumAggregate>;
};

export type AggregateTranscripts = {
  __typename?: 'AggregateTranscripts';
  _avg?: Maybe<TranscriptsAvgAggregate>;
  _count?: Maybe<TranscriptsCountAggregate>;
  _max?: Maybe<TranscriptsMaxAggregate>;
  _min?: Maybe<TranscriptsMinAggregate>;
  _sum?: Maybe<TranscriptsSumAggregate>;
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  _avg?: Maybe<UserAvgAggregate>;
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _sum?: Maybe<UserSumAggregate>;
};

export type AthleteProfile = {
  __typename?: 'AthleteProfile';
  _count?: Maybe<AthleteProfileCount>;
  coachContactName?: Maybe<Scalars['String']['output']>;
  coachContactPhoneNumber?: Maybe<Scalars['String']['output']>;
  coachContactTitle?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Country>;
  countryId?: Maybe<Scalars['BigInt']['output']>;
  createdAt: Scalars['DateTime']['output'];
  evaluations: Array<Evaluation>;
  gpa?: Maybe<Scalars['String']['output']>;
  graduationYear?: Maybe<Scalars['String']['output']>;
  hudlLink?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigInt']['output'];
  interestedSchools: Array<InterestedSchools>;
  playerCardUrl?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Position>;
  positionId?: Maybe<Scalars['BigInt']['output']>;
  prospectedSchools: Array<ProspectedAthlete>;
  recruitedSchools: Array<RecruitedAthlete>;
  recruitingContactName?: Maybe<Scalars['String']['output']>;
  recruitingPhoneNumber?: Maybe<Scalars['String']['output']>;
  recruitingRelationship?: Maybe<Scalars['String']['output']>;
  school: School;
  schoolId: Scalars['BigInt']['output'];
  skills: Array<Skills>;
  transcripts: Array<Transcripts>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
  verifiedBy?: Maybe<CoachProfile>;
  verifiedById?: Maybe<Scalars['BigInt']['output']>;
};


export type AthleteProfileEvaluationsArgs = {
  cursor?: InputMaybe<EvaluationWhereUniqueInput>;
  distinct?: InputMaybe<Array<EvaluationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EvaluationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EvaluationWhereInput>;
};


export type AthleteProfileInterestedSchoolsArgs = {
  cursor?: InputMaybe<InterestedSchoolsWhereUniqueInput>;
  distinct?: InputMaybe<Array<InterestedSchoolsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InterestedSchoolsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<InterestedSchoolsWhereInput>;
};


export type AthleteProfileProspectedSchoolsArgs = {
  cursor?: InputMaybe<ProspectedAthleteWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProspectedAthleteScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProspectedAthleteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProspectedAthleteWhereInput>;
};


export type AthleteProfileRecruitedSchoolsArgs = {
  cursor?: InputMaybe<RecruitedAthleteWhereUniqueInput>;
  distinct?: InputMaybe<Array<RecruitedAthleteScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RecruitedAthleteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RecruitedAthleteWhereInput>;
};


export type AthleteProfileSkillsArgs = {
  cursor?: InputMaybe<SkillsWhereUniqueInput>;
  distinct?: InputMaybe<Array<SkillsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SkillsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SkillsWhereInput>;
};


export type AthleteProfileTranscriptsArgs = {
  cursor?: InputMaybe<TranscriptsWhereUniqueInput>;
  distinct?: InputMaybe<Array<TranscriptsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TranscriptsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TranscriptsWhereInput>;
};

export type AthleteProfileAvgAggregate = {
  __typename?: 'AthleteProfileAvgAggregate';
  countryId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  positionId?: Maybe<Scalars['Float']['output']>;
  schoolId?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
  verifiedById?: Maybe<Scalars['Float']['output']>;
};

export type AthleteProfileAvgOrderByAggregateInput = {
  countryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  positionId?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  verifiedById?: InputMaybe<SortOrder>;
};

export type AthleteProfileCount = {
  __typename?: 'AthleteProfileCount';
  evaluations: Scalars['Int']['output'];
  interestedSchools: Scalars['Int']['output'];
  prospectedSchools: Scalars['Int']['output'];
  recruitedSchools: Scalars['Int']['output'];
  skills: Scalars['Int']['output'];
  transcripts: Scalars['Int']['output'];
};

export type AthleteProfileCountAggregate = {
  __typename?: 'AthleteProfileCountAggregate';
  _all: Scalars['Int']['output'];
  coachContactName: Scalars['Int']['output'];
  coachContactPhoneNumber: Scalars['Int']['output'];
  coachContactTitle: Scalars['Int']['output'];
  countryId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  gpa: Scalars['Int']['output'];
  graduationYear: Scalars['Int']['output'];
  hudlLink: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  playerCardUrl: Scalars['Int']['output'];
  positionId: Scalars['Int']['output'];
  recruitingContactName: Scalars['Int']['output'];
  recruitingPhoneNumber: Scalars['Int']['output'];
  recruitingRelationship: Scalars['Int']['output'];
  schoolId: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
  verified: Scalars['Int']['output'];
  verifiedById: Scalars['Int']['output'];
};

export type AthleteProfileCountOrderByAggregateInput = {
  coachContactName?: InputMaybe<SortOrder>;
  coachContactPhoneNumber?: InputMaybe<SortOrder>;
  coachContactTitle?: InputMaybe<SortOrder>;
  countryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  gpa?: InputMaybe<SortOrder>;
  graduationYear?: InputMaybe<SortOrder>;
  hudlLink?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  playerCardUrl?: InputMaybe<SortOrder>;
  positionId?: InputMaybe<SortOrder>;
  recruitingContactName?: InputMaybe<SortOrder>;
  recruitingPhoneNumber?: InputMaybe<SortOrder>;
  recruitingRelationship?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  verified?: InputMaybe<SortOrder>;
  verifiedById?: InputMaybe<SortOrder>;
};

export type AthleteProfileCreateInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutAthleteProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutAthleteInput>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutAthleteInput>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<PositionCreateNestedOneWithoutAthleteProfilesInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInput;
  skills?: InputMaybe<SkillsCreateNestedManyWithoutAthleteInput>;
  transcripts?: InputMaybe<TranscriptsCreateNestedManyWithoutAthleteProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAthleteProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedBy?: InputMaybe<CoachProfileCreateNestedOneWithoutVerifiedAthletesInput>;
};

export type AthleteProfileCreateManyCountryInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  positionId?: InputMaybe<Scalars['BigInt']['input']>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedById?: InputMaybe<Scalars['BigInt']['input']>;
};

export type AthleteProfileCreateManyCountryInputEnvelope = {
  data: Array<AthleteProfileCreateManyCountryInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AthleteProfileCreateManyInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  positionId?: InputMaybe<Scalars['BigInt']['input']>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedById?: InputMaybe<Scalars['BigInt']['input']>;
};

export type AthleteProfileCreateManyPositionInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedById?: InputMaybe<Scalars['BigInt']['input']>;
};

export type AthleteProfileCreateManyPositionInputEnvelope = {
  data: Array<AthleteProfileCreateManyPositionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AthleteProfileCreateManySchoolInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  positionId?: InputMaybe<Scalars['BigInt']['input']>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedById?: InputMaybe<Scalars['BigInt']['input']>;
};

export type AthleteProfileCreateManySchoolInputEnvelope = {
  data: Array<AthleteProfileCreateManySchoolInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AthleteProfileCreateManyVerifiedByInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  positionId?: InputMaybe<Scalars['BigInt']['input']>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AthleteProfileCreateManyVerifiedByInputEnvelope = {
  data: Array<AthleteProfileCreateManyVerifiedByInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AthleteProfileCreateNestedManyWithoutCountryInput = {
  connect?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AthleteProfileCreateOrConnectWithoutCountryInput>>;
  create?: InputMaybe<Array<AthleteProfileCreateWithoutCountryInput>>;
  createMany?: InputMaybe<AthleteProfileCreateManyCountryInputEnvelope>;
};

export type AthleteProfileCreateNestedManyWithoutPositionInput = {
  connect?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AthleteProfileCreateOrConnectWithoutPositionInput>>;
  create?: InputMaybe<Array<AthleteProfileCreateWithoutPositionInput>>;
  createMany?: InputMaybe<AthleteProfileCreateManyPositionInputEnvelope>;
};

export type AthleteProfileCreateNestedManyWithoutSchoolInput = {
  connect?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AthleteProfileCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<AthleteProfileCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<AthleteProfileCreateManySchoolInputEnvelope>;
};

export type AthleteProfileCreateNestedManyWithoutVerifiedByInput = {
  connect?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AthleteProfileCreateOrConnectWithoutVerifiedByInput>>;
  create?: InputMaybe<Array<AthleteProfileCreateWithoutVerifiedByInput>>;
  createMany?: InputMaybe<AthleteProfileCreateManyVerifiedByInputEnvelope>;
};

export type AthleteProfileCreateNestedOneWithoutEvaluationsInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutEvaluationsInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutEvaluationsInput>;
};

export type AthleteProfileCreateNestedOneWithoutInterestedSchoolsInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutInterestedSchoolsInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutInterestedSchoolsInput>;
};

export type AthleteProfileCreateNestedOneWithoutProspectedSchoolsInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutProspectedSchoolsInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutProspectedSchoolsInput>;
};

export type AthleteProfileCreateNestedOneWithoutRecruitedSchoolsInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutRecruitedSchoolsInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutRecruitedSchoolsInput>;
};

export type AthleteProfileCreateNestedOneWithoutSkillsInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutSkillsInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutSkillsInput>;
};

export type AthleteProfileCreateNestedOneWithoutTranscriptsInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutTranscriptsInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutTranscriptsInput>;
};

export type AthleteProfileCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutUserInput>;
};

export type AthleteProfileCreateOrConnectWithoutCountryInput = {
  create: AthleteProfileCreateWithoutCountryInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileCreateOrConnectWithoutEvaluationsInput = {
  create: AthleteProfileCreateWithoutEvaluationsInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileCreateOrConnectWithoutInterestedSchoolsInput = {
  create: AthleteProfileCreateWithoutInterestedSchoolsInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileCreateOrConnectWithoutPositionInput = {
  create: AthleteProfileCreateWithoutPositionInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileCreateOrConnectWithoutProspectedSchoolsInput = {
  create: AthleteProfileCreateWithoutProspectedSchoolsInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileCreateOrConnectWithoutRecruitedSchoolsInput = {
  create: AthleteProfileCreateWithoutRecruitedSchoolsInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileCreateOrConnectWithoutSchoolInput = {
  create: AthleteProfileCreateWithoutSchoolInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileCreateOrConnectWithoutSkillsInput = {
  create: AthleteProfileCreateWithoutSkillsInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileCreateOrConnectWithoutTranscriptsInput = {
  create: AthleteProfileCreateWithoutTranscriptsInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileCreateOrConnectWithoutUserInput = {
  create: AthleteProfileCreateWithoutUserInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileCreateOrConnectWithoutVerifiedByInput = {
  create: AthleteProfileCreateWithoutVerifiedByInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileCreateWithoutCountryInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutAthleteInput>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutAthleteInput>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<PositionCreateNestedOneWithoutAthleteProfilesInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInput;
  skills?: InputMaybe<SkillsCreateNestedManyWithoutAthleteInput>;
  transcripts?: InputMaybe<TranscriptsCreateNestedManyWithoutAthleteProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAthleteProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedBy?: InputMaybe<CoachProfileCreateNestedOneWithoutVerifiedAthletesInput>;
};

export type AthleteProfileCreateWithoutEvaluationsInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutAthleteProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutAthleteInput>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<PositionCreateNestedOneWithoutAthleteProfilesInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInput;
  skills?: InputMaybe<SkillsCreateNestedManyWithoutAthleteInput>;
  transcripts?: InputMaybe<TranscriptsCreateNestedManyWithoutAthleteProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAthleteProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedBy?: InputMaybe<CoachProfileCreateNestedOneWithoutVerifiedAthletesInput>;
};

export type AthleteProfileCreateWithoutInterestedSchoolsInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutAthleteProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutAthleteInput>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<PositionCreateNestedOneWithoutAthleteProfilesInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInput;
  skills?: InputMaybe<SkillsCreateNestedManyWithoutAthleteInput>;
  transcripts?: InputMaybe<TranscriptsCreateNestedManyWithoutAthleteProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAthleteProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedBy?: InputMaybe<CoachProfileCreateNestedOneWithoutVerifiedAthletesInput>;
};

export type AthleteProfileCreateWithoutPositionInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutAthleteProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutAthleteInput>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutAthleteInput>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInput;
  skills?: InputMaybe<SkillsCreateNestedManyWithoutAthleteInput>;
  transcripts?: InputMaybe<TranscriptsCreateNestedManyWithoutAthleteProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAthleteProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedBy?: InputMaybe<CoachProfileCreateNestedOneWithoutVerifiedAthletesInput>;
};

export type AthleteProfileCreateWithoutProspectedSchoolsInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutAthleteProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutAthleteInput>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutAthleteInput>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<PositionCreateNestedOneWithoutAthleteProfilesInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInput;
  skills?: InputMaybe<SkillsCreateNestedManyWithoutAthleteInput>;
  transcripts?: InputMaybe<TranscriptsCreateNestedManyWithoutAthleteProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAthleteProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedBy?: InputMaybe<CoachProfileCreateNestedOneWithoutVerifiedAthletesInput>;
};

export type AthleteProfileCreateWithoutRecruitedSchoolsInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutAthleteProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutAthleteInput>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutAthleteInput>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<PositionCreateNestedOneWithoutAthleteProfilesInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInput;
  skills?: InputMaybe<SkillsCreateNestedManyWithoutAthleteInput>;
  transcripts?: InputMaybe<TranscriptsCreateNestedManyWithoutAthleteProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAthleteProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedBy?: InputMaybe<CoachProfileCreateNestedOneWithoutVerifiedAthletesInput>;
};

export type AthleteProfileCreateWithoutSchoolInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutAthleteProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutAthleteInput>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutAthleteInput>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<PositionCreateNestedOneWithoutAthleteProfilesInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<SkillsCreateNestedManyWithoutAthleteInput>;
  transcripts?: InputMaybe<TranscriptsCreateNestedManyWithoutAthleteProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAthleteProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedBy?: InputMaybe<CoachProfileCreateNestedOneWithoutVerifiedAthletesInput>;
};

export type AthleteProfileCreateWithoutSkillsInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutAthleteProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutAthleteInput>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutAthleteInput>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<PositionCreateNestedOneWithoutAthleteProfilesInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInput;
  transcripts?: InputMaybe<TranscriptsCreateNestedManyWithoutAthleteProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAthleteProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedBy?: InputMaybe<CoachProfileCreateNestedOneWithoutVerifiedAthletesInput>;
};

export type AthleteProfileCreateWithoutTranscriptsInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutAthleteProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutAthleteInput>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutAthleteInput>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<PositionCreateNestedOneWithoutAthleteProfilesInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInput;
  skills?: InputMaybe<SkillsCreateNestedManyWithoutAthleteInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAthleteProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedBy?: InputMaybe<CoachProfileCreateNestedOneWithoutVerifiedAthletesInput>;
};

export type AthleteProfileCreateWithoutUserInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutAthleteProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutAthleteInput>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutAthleteInput>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<PositionCreateNestedOneWithoutAthleteProfilesInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInput;
  skills?: InputMaybe<SkillsCreateNestedManyWithoutAthleteInput>;
  transcripts?: InputMaybe<TranscriptsCreateNestedManyWithoutAthleteProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedBy?: InputMaybe<CoachProfileCreateNestedOneWithoutVerifiedAthletesInput>;
};

export type AthleteProfileCreateWithoutVerifiedByInput = {
  coachContactName?: InputMaybe<Scalars['String']['input']>;
  coachContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  coachContactTitle?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutAthleteProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutAthleteInput>;
  gpa?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['String']['input']>;
  hudlLink?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutAthleteInput>;
  playerCardUrl?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<PositionCreateNestedOneWithoutAthleteProfilesInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutAthleteInput>;
  recruitingContactName?: InputMaybe<Scalars['String']['input']>;
  recruitingPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  recruitingRelationship?: InputMaybe<Scalars['String']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInput;
  skills?: InputMaybe<SkillsCreateNestedManyWithoutAthleteInput>;
  transcripts?: InputMaybe<TranscriptsCreateNestedManyWithoutAthleteProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAthleteProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AthleteProfileGroupBy = {
  __typename?: 'AthleteProfileGroupBy';
  _avg?: Maybe<AthleteProfileAvgAggregate>;
  _count?: Maybe<AthleteProfileCountAggregate>;
  _max?: Maybe<AthleteProfileMaxAggregate>;
  _min?: Maybe<AthleteProfileMinAggregate>;
  _sum?: Maybe<AthleteProfileSumAggregate>;
  coachContactName?: Maybe<Scalars['String']['output']>;
  coachContactPhoneNumber?: Maybe<Scalars['String']['output']>;
  coachContactTitle?: Maybe<Scalars['String']['output']>;
  countryId?: Maybe<Scalars['BigInt']['output']>;
  createdAt: Scalars['DateTime']['output'];
  gpa?: Maybe<Scalars['String']['output']>;
  graduationYear?: Maybe<Scalars['String']['output']>;
  hudlLink?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigInt']['output'];
  playerCardUrl?: Maybe<Scalars['String']['output']>;
  positionId?: Maybe<Scalars['BigInt']['output']>;
  recruitingContactName?: Maybe<Scalars['String']['output']>;
  recruitingPhoneNumber?: Maybe<Scalars['String']['output']>;
  recruitingRelationship?: Maybe<Scalars['String']['output']>;
  schoolId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
  verifiedById?: Maybe<Scalars['BigInt']['output']>;
};

export type AthleteProfileListRelationFilter = {
  every?: InputMaybe<AthleteProfileWhereInput>;
  none?: InputMaybe<AthleteProfileWhereInput>;
  some?: InputMaybe<AthleteProfileWhereInput>;
};

export type AthleteProfileMaxAggregate = {
  __typename?: 'AthleteProfileMaxAggregate';
  coachContactName?: Maybe<Scalars['String']['output']>;
  coachContactPhoneNumber?: Maybe<Scalars['String']['output']>;
  coachContactTitle?: Maybe<Scalars['String']['output']>;
  countryId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  gpa?: Maybe<Scalars['String']['output']>;
  graduationYear?: Maybe<Scalars['String']['output']>;
  hudlLink?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  playerCardUrl?: Maybe<Scalars['String']['output']>;
  positionId?: Maybe<Scalars['BigInt']['output']>;
  recruitingContactName?: Maybe<Scalars['String']['output']>;
  recruitingPhoneNumber?: Maybe<Scalars['String']['output']>;
  recruitingRelationship?: Maybe<Scalars['String']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
  verifiedById?: Maybe<Scalars['BigInt']['output']>;
};

export type AthleteProfileMaxOrderByAggregateInput = {
  coachContactName?: InputMaybe<SortOrder>;
  coachContactPhoneNumber?: InputMaybe<SortOrder>;
  coachContactTitle?: InputMaybe<SortOrder>;
  countryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  gpa?: InputMaybe<SortOrder>;
  graduationYear?: InputMaybe<SortOrder>;
  hudlLink?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  playerCardUrl?: InputMaybe<SortOrder>;
  positionId?: InputMaybe<SortOrder>;
  recruitingContactName?: InputMaybe<SortOrder>;
  recruitingPhoneNumber?: InputMaybe<SortOrder>;
  recruitingRelationship?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  verified?: InputMaybe<SortOrder>;
  verifiedById?: InputMaybe<SortOrder>;
};

export type AthleteProfileMinAggregate = {
  __typename?: 'AthleteProfileMinAggregate';
  coachContactName?: Maybe<Scalars['String']['output']>;
  coachContactPhoneNumber?: Maybe<Scalars['String']['output']>;
  coachContactTitle?: Maybe<Scalars['String']['output']>;
  countryId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  gpa?: Maybe<Scalars['String']['output']>;
  graduationYear?: Maybe<Scalars['String']['output']>;
  hudlLink?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  playerCardUrl?: Maybe<Scalars['String']['output']>;
  positionId?: Maybe<Scalars['BigInt']['output']>;
  recruitingContactName?: Maybe<Scalars['String']['output']>;
  recruitingPhoneNumber?: Maybe<Scalars['String']['output']>;
  recruitingRelationship?: Maybe<Scalars['String']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
  verifiedById?: Maybe<Scalars['BigInt']['output']>;
};

export type AthleteProfileMinOrderByAggregateInput = {
  coachContactName?: InputMaybe<SortOrder>;
  coachContactPhoneNumber?: InputMaybe<SortOrder>;
  coachContactTitle?: InputMaybe<SortOrder>;
  countryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  gpa?: InputMaybe<SortOrder>;
  graduationYear?: InputMaybe<SortOrder>;
  hudlLink?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  playerCardUrl?: InputMaybe<SortOrder>;
  positionId?: InputMaybe<SortOrder>;
  recruitingContactName?: InputMaybe<SortOrder>;
  recruitingPhoneNumber?: InputMaybe<SortOrder>;
  recruitingRelationship?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  verified?: InputMaybe<SortOrder>;
  verifiedById?: InputMaybe<SortOrder>;
};

export type AthleteProfileOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AthleteProfileOrderByWithAggregationInput = {
  _avg?: InputMaybe<AthleteProfileAvgOrderByAggregateInput>;
  _count?: InputMaybe<AthleteProfileCountOrderByAggregateInput>;
  _max?: InputMaybe<AthleteProfileMaxOrderByAggregateInput>;
  _min?: InputMaybe<AthleteProfileMinOrderByAggregateInput>;
  _sum?: InputMaybe<AthleteProfileSumOrderByAggregateInput>;
  coachContactName?: InputMaybe<SortOrder>;
  coachContactPhoneNumber?: InputMaybe<SortOrder>;
  coachContactTitle?: InputMaybe<SortOrder>;
  countryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  gpa?: InputMaybe<SortOrder>;
  graduationYear?: InputMaybe<SortOrder>;
  hudlLink?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  playerCardUrl?: InputMaybe<SortOrder>;
  positionId?: InputMaybe<SortOrder>;
  recruitingContactName?: InputMaybe<SortOrder>;
  recruitingPhoneNumber?: InputMaybe<SortOrder>;
  recruitingRelationship?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  verified?: InputMaybe<SortOrder>;
  verifiedById?: InputMaybe<SortOrder>;
};

export type AthleteProfileOrderByWithRelationInput = {
  coachContactName?: InputMaybe<SortOrder>;
  coachContactPhoneNumber?: InputMaybe<SortOrder>;
  coachContactTitle?: InputMaybe<SortOrder>;
  country?: InputMaybe<CountryOrderByWithRelationInput>;
  countryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  evaluations?: InputMaybe<EvaluationOrderByRelationAggregateInput>;
  gpa?: InputMaybe<SortOrder>;
  graduationYear?: InputMaybe<SortOrder>;
  hudlLink?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  interestedSchools?: InputMaybe<InterestedSchoolsOrderByRelationAggregateInput>;
  playerCardUrl?: InputMaybe<SortOrder>;
  position?: InputMaybe<PositionOrderByWithRelationInput>;
  positionId?: InputMaybe<SortOrder>;
  prospectedSchools?: InputMaybe<ProspectedAthleteOrderByRelationAggregateInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteOrderByRelationAggregateInput>;
  recruitingContactName?: InputMaybe<SortOrder>;
  recruitingPhoneNumber?: InputMaybe<SortOrder>;
  recruitingRelationship?: InputMaybe<SortOrder>;
  school?: InputMaybe<SchoolOrderByWithRelationInput>;
  schoolId?: InputMaybe<SortOrder>;
  skills?: InputMaybe<SkillsOrderByRelationAggregateInput>;
  transcripts?: InputMaybe<TranscriptsOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  verified?: InputMaybe<SortOrder>;
  verifiedBy?: InputMaybe<CoachProfileOrderByWithRelationInput>;
  verifiedById?: InputMaybe<SortOrder>;
};

export type AthleteProfileRelationFilter = {
  is?: InputMaybe<AthleteProfileWhereInput>;
  isNot?: InputMaybe<AthleteProfileWhereInput>;
};

export enum AthleteProfileScalarFieldEnum {
  CoachContactName = 'coachContactName',
  CoachContactPhoneNumber = 'coachContactPhoneNumber',
  CoachContactTitle = 'coachContactTitle',
  CountryId = 'countryId',
  CreatedAt = 'createdAt',
  Gpa = 'gpa',
  GraduationYear = 'graduationYear',
  HudlLink = 'hudlLink',
  Id = 'id',
  PlayerCardUrl = 'playerCardUrl',
  PositionId = 'positionId',
  RecruitingContactName = 'recruitingContactName',
  RecruitingPhoneNumber = 'recruitingPhoneNumber',
  RecruitingRelationship = 'recruitingRelationship',
  SchoolId = 'schoolId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  Uuid = 'uuid',
  Verified = 'verified',
  VerifiedById = 'verifiedById'
}

export type AthleteProfileScalarWhereInput = {
  AND?: InputMaybe<Array<AthleteProfileScalarWhereInput>>;
  NOT?: InputMaybe<Array<AthleteProfileScalarWhereInput>>;
  OR?: InputMaybe<Array<AthleteProfileScalarWhereInput>>;
  coachContactName?: InputMaybe<StringNullableFilter>;
  coachContactPhoneNumber?: InputMaybe<StringNullableFilter>;
  coachContactTitle?: InputMaybe<StringNullableFilter>;
  countryId?: InputMaybe<BigIntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  gpa?: InputMaybe<StringNullableFilter>;
  graduationYear?: InputMaybe<StringNullableFilter>;
  hudlLink?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<BigIntFilter>;
  playerCardUrl?: InputMaybe<StringNullableFilter>;
  positionId?: InputMaybe<BigIntNullableFilter>;
  recruitingContactName?: InputMaybe<StringNullableFilter>;
  recruitingPhoneNumber?: InputMaybe<StringNullableFilter>;
  recruitingRelationship?: InputMaybe<StringNullableFilter>;
  schoolId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
  verified?: InputMaybe<BoolFilter>;
  verifiedById?: InputMaybe<BigIntNullableFilter>;
};

export type AthleteProfileScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<AthleteProfileScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<AthleteProfileScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<AthleteProfileScalarWhereWithAggregatesInput>>;
  coachContactName?: InputMaybe<StringNullableWithAggregatesFilter>;
  coachContactPhoneNumber?: InputMaybe<StringNullableWithAggregatesFilter>;
  coachContactTitle?: InputMaybe<StringNullableWithAggregatesFilter>;
  countryId?: InputMaybe<BigIntNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  gpa?: InputMaybe<StringNullableWithAggregatesFilter>;
  graduationYear?: InputMaybe<StringNullableWithAggregatesFilter>;
  hudlLink?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  playerCardUrl?: InputMaybe<StringNullableWithAggregatesFilter>;
  positionId?: InputMaybe<BigIntNullableWithAggregatesFilter>;
  recruitingContactName?: InputMaybe<StringNullableWithAggregatesFilter>;
  recruitingPhoneNumber?: InputMaybe<StringNullableWithAggregatesFilter>;
  recruitingRelationship?: InputMaybe<StringNullableWithAggregatesFilter>;
  schoolId?: InputMaybe<BigIntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<BigIntWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
  verified?: InputMaybe<BoolWithAggregatesFilter>;
  verifiedById?: InputMaybe<BigIntNullableWithAggregatesFilter>;
};

export type AthleteProfileSumAggregate = {
  __typename?: 'AthleteProfileSumAggregate';
  countryId?: Maybe<Scalars['BigInt']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  positionId?: Maybe<Scalars['BigInt']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  verifiedById?: Maybe<Scalars['BigInt']['output']>;
};

export type AthleteProfileSumOrderByAggregateInput = {
  countryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  positionId?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  verifiedById?: InputMaybe<SortOrder>;
};

export type AthleteProfileUpdateInput = {
  coachContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutAthleteProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutAthleteNestedInput>;
  gpa?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graduationYear?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hudlLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutAthleteNestedInput>;
  playerCardUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  position?: InputMaybe<PositionUpdateOneWithoutAthleteProfilesNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitingContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingRelationship?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesNestedInput>;
  skills?: InputMaybe<SkillsUpdateManyWithoutAthleteNestedInput>;
  transcripts?: InputMaybe<TranscriptsUpdateManyWithoutAthleteProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAthleteProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedBy?: InputMaybe<CoachProfileUpdateOneWithoutVerifiedAthletesNestedInput>;
};

export type AthleteProfileUpdateManyMutationInput = {
  coachContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  gpa?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graduationYear?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hudlLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  playerCardUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingRelationship?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type AthleteProfileUpdateManyWithWhereWithoutCountryInput = {
  data: AthleteProfileUpdateManyMutationInput;
  where: AthleteProfileScalarWhereInput;
};

export type AthleteProfileUpdateManyWithWhereWithoutPositionInput = {
  data: AthleteProfileUpdateManyMutationInput;
  where: AthleteProfileScalarWhereInput;
};

export type AthleteProfileUpdateManyWithWhereWithoutSchoolInput = {
  data: AthleteProfileUpdateManyMutationInput;
  where: AthleteProfileScalarWhereInput;
};

export type AthleteProfileUpdateManyWithWhereWithoutVerifiedByInput = {
  data: AthleteProfileUpdateManyMutationInput;
  where: AthleteProfileScalarWhereInput;
};

export type AthleteProfileUpdateManyWithoutCountryNestedInput = {
  connect?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AthleteProfileCreateOrConnectWithoutCountryInput>>;
  create?: InputMaybe<Array<AthleteProfileCreateWithoutCountryInput>>;
  createMany?: InputMaybe<AthleteProfileCreateManyCountryInputEnvelope>;
  delete?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AthleteProfileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  set?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  update?: InputMaybe<Array<AthleteProfileUpdateWithWhereUniqueWithoutCountryInput>>;
  updateMany?: InputMaybe<Array<AthleteProfileUpdateManyWithWhereWithoutCountryInput>>;
  upsert?: InputMaybe<Array<AthleteProfileUpsertWithWhereUniqueWithoutCountryInput>>;
};

export type AthleteProfileUpdateManyWithoutPositionNestedInput = {
  connect?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AthleteProfileCreateOrConnectWithoutPositionInput>>;
  create?: InputMaybe<Array<AthleteProfileCreateWithoutPositionInput>>;
  createMany?: InputMaybe<AthleteProfileCreateManyPositionInputEnvelope>;
  delete?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AthleteProfileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  set?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  update?: InputMaybe<Array<AthleteProfileUpdateWithWhereUniqueWithoutPositionInput>>;
  updateMany?: InputMaybe<Array<AthleteProfileUpdateManyWithWhereWithoutPositionInput>>;
  upsert?: InputMaybe<Array<AthleteProfileUpsertWithWhereUniqueWithoutPositionInput>>;
};

export type AthleteProfileUpdateManyWithoutSchoolNestedInput = {
  connect?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AthleteProfileCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<AthleteProfileCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<AthleteProfileCreateManySchoolInputEnvelope>;
  delete?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AthleteProfileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  set?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  update?: InputMaybe<Array<AthleteProfileUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: InputMaybe<Array<AthleteProfileUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: InputMaybe<Array<AthleteProfileUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type AthleteProfileUpdateManyWithoutVerifiedByNestedInput = {
  connect?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AthleteProfileCreateOrConnectWithoutVerifiedByInput>>;
  create?: InputMaybe<Array<AthleteProfileCreateWithoutVerifiedByInput>>;
  createMany?: InputMaybe<AthleteProfileCreateManyVerifiedByInputEnvelope>;
  delete?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AthleteProfileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  set?: InputMaybe<Array<AthleteProfileWhereUniqueInput>>;
  update?: InputMaybe<Array<AthleteProfileUpdateWithWhereUniqueWithoutVerifiedByInput>>;
  updateMany?: InputMaybe<Array<AthleteProfileUpdateManyWithWhereWithoutVerifiedByInput>>;
  upsert?: InputMaybe<Array<AthleteProfileUpsertWithWhereUniqueWithoutVerifiedByInput>>;
};

export type AthleteProfileUpdateOneRequiredWithoutEvaluationsNestedInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutEvaluationsInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutEvaluationsInput>;
  update?: InputMaybe<AthleteProfileUpdateWithoutEvaluationsInput>;
  upsert?: InputMaybe<AthleteProfileUpsertWithoutEvaluationsInput>;
};

export type AthleteProfileUpdateOneRequiredWithoutInterestedSchoolsNestedInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutInterestedSchoolsInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutInterestedSchoolsInput>;
  update?: InputMaybe<AthleteProfileUpdateWithoutInterestedSchoolsInput>;
  upsert?: InputMaybe<AthleteProfileUpsertWithoutInterestedSchoolsInput>;
};

export type AthleteProfileUpdateOneRequiredWithoutProspectedSchoolsNestedInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutProspectedSchoolsInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutProspectedSchoolsInput>;
  update?: InputMaybe<AthleteProfileUpdateWithoutProspectedSchoolsInput>;
  upsert?: InputMaybe<AthleteProfileUpsertWithoutProspectedSchoolsInput>;
};

export type AthleteProfileUpdateOneRequiredWithoutRecruitedSchoolsNestedInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutRecruitedSchoolsInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutRecruitedSchoolsInput>;
  update?: InputMaybe<AthleteProfileUpdateWithoutRecruitedSchoolsInput>;
  upsert?: InputMaybe<AthleteProfileUpsertWithoutRecruitedSchoolsInput>;
};

export type AthleteProfileUpdateOneWithoutSkillsNestedInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutSkillsInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutSkillsInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<AthleteProfileUpdateWithoutSkillsInput>;
  upsert?: InputMaybe<AthleteProfileUpsertWithoutSkillsInput>;
};

export type AthleteProfileUpdateOneWithoutTranscriptsNestedInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutTranscriptsInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutTranscriptsInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<AthleteProfileUpdateWithoutTranscriptsInput>;
  upsert?: InputMaybe<AthleteProfileUpsertWithoutTranscriptsInput>;
};

export type AthleteProfileUpdateOneWithoutUserNestedInput = {
  connect?: InputMaybe<AthleteProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AthleteProfileCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<AthleteProfileCreateWithoutUserInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<AthleteProfileUpdateWithoutUserInput>;
  upsert?: InputMaybe<AthleteProfileUpsertWithoutUserInput>;
};

export type AthleteProfileUpdateWithWhereUniqueWithoutCountryInput = {
  data: AthleteProfileUpdateWithoutCountryInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileUpdateWithWhereUniqueWithoutPositionInput = {
  data: AthleteProfileUpdateWithoutPositionInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileUpdateWithWhereUniqueWithoutSchoolInput = {
  data: AthleteProfileUpdateWithoutSchoolInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileUpdateWithWhereUniqueWithoutVerifiedByInput = {
  data: AthleteProfileUpdateWithoutVerifiedByInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileUpdateWithoutCountryInput = {
  coachContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutAthleteNestedInput>;
  gpa?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graduationYear?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hudlLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutAthleteNestedInput>;
  playerCardUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  position?: InputMaybe<PositionUpdateOneWithoutAthleteProfilesNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitingContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingRelationship?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesNestedInput>;
  skills?: InputMaybe<SkillsUpdateManyWithoutAthleteNestedInput>;
  transcripts?: InputMaybe<TranscriptsUpdateManyWithoutAthleteProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAthleteProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedBy?: InputMaybe<CoachProfileUpdateOneWithoutVerifiedAthletesNestedInput>;
};

export type AthleteProfileUpdateWithoutEvaluationsInput = {
  coachContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutAthleteProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  gpa?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graduationYear?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hudlLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutAthleteNestedInput>;
  playerCardUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  position?: InputMaybe<PositionUpdateOneWithoutAthleteProfilesNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitingContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingRelationship?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesNestedInput>;
  skills?: InputMaybe<SkillsUpdateManyWithoutAthleteNestedInput>;
  transcripts?: InputMaybe<TranscriptsUpdateManyWithoutAthleteProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAthleteProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedBy?: InputMaybe<CoachProfileUpdateOneWithoutVerifiedAthletesNestedInput>;
};

export type AthleteProfileUpdateWithoutInterestedSchoolsInput = {
  coachContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutAthleteProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutAthleteNestedInput>;
  gpa?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graduationYear?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hudlLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  playerCardUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  position?: InputMaybe<PositionUpdateOneWithoutAthleteProfilesNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitingContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingRelationship?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesNestedInput>;
  skills?: InputMaybe<SkillsUpdateManyWithoutAthleteNestedInput>;
  transcripts?: InputMaybe<TranscriptsUpdateManyWithoutAthleteProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAthleteProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedBy?: InputMaybe<CoachProfileUpdateOneWithoutVerifiedAthletesNestedInput>;
};

export type AthleteProfileUpdateWithoutPositionInput = {
  coachContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutAthleteProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutAthleteNestedInput>;
  gpa?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graduationYear?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hudlLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutAthleteNestedInput>;
  playerCardUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitingContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingRelationship?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesNestedInput>;
  skills?: InputMaybe<SkillsUpdateManyWithoutAthleteNestedInput>;
  transcripts?: InputMaybe<TranscriptsUpdateManyWithoutAthleteProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAthleteProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedBy?: InputMaybe<CoachProfileUpdateOneWithoutVerifiedAthletesNestedInput>;
};

export type AthleteProfileUpdateWithoutProspectedSchoolsInput = {
  coachContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutAthleteProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutAthleteNestedInput>;
  gpa?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graduationYear?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hudlLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutAthleteNestedInput>;
  playerCardUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  position?: InputMaybe<PositionUpdateOneWithoutAthleteProfilesNestedInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitingContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingRelationship?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesNestedInput>;
  skills?: InputMaybe<SkillsUpdateManyWithoutAthleteNestedInput>;
  transcripts?: InputMaybe<TranscriptsUpdateManyWithoutAthleteProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAthleteProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedBy?: InputMaybe<CoachProfileUpdateOneWithoutVerifiedAthletesNestedInput>;
};

export type AthleteProfileUpdateWithoutRecruitedSchoolsInput = {
  coachContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutAthleteProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutAthleteNestedInput>;
  gpa?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graduationYear?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hudlLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutAthleteNestedInput>;
  playerCardUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  position?: InputMaybe<PositionUpdateOneWithoutAthleteProfilesNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitingContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingRelationship?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesNestedInput>;
  skills?: InputMaybe<SkillsUpdateManyWithoutAthleteNestedInput>;
  transcripts?: InputMaybe<TranscriptsUpdateManyWithoutAthleteProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAthleteProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedBy?: InputMaybe<CoachProfileUpdateOneWithoutVerifiedAthletesNestedInput>;
};

export type AthleteProfileUpdateWithoutSchoolInput = {
  coachContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutAthleteProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutAthleteNestedInput>;
  gpa?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graduationYear?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hudlLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutAthleteNestedInput>;
  playerCardUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  position?: InputMaybe<PositionUpdateOneWithoutAthleteProfilesNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitingContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingRelationship?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  skills?: InputMaybe<SkillsUpdateManyWithoutAthleteNestedInput>;
  transcripts?: InputMaybe<TranscriptsUpdateManyWithoutAthleteProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAthleteProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedBy?: InputMaybe<CoachProfileUpdateOneWithoutVerifiedAthletesNestedInput>;
};

export type AthleteProfileUpdateWithoutSkillsInput = {
  coachContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutAthleteProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutAthleteNestedInput>;
  gpa?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graduationYear?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hudlLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutAthleteNestedInput>;
  playerCardUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  position?: InputMaybe<PositionUpdateOneWithoutAthleteProfilesNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitingContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingRelationship?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesNestedInput>;
  transcripts?: InputMaybe<TranscriptsUpdateManyWithoutAthleteProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAthleteProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedBy?: InputMaybe<CoachProfileUpdateOneWithoutVerifiedAthletesNestedInput>;
};

export type AthleteProfileUpdateWithoutTranscriptsInput = {
  coachContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutAthleteProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutAthleteNestedInput>;
  gpa?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graduationYear?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hudlLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutAthleteNestedInput>;
  playerCardUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  position?: InputMaybe<PositionUpdateOneWithoutAthleteProfilesNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitingContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingRelationship?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesNestedInput>;
  skills?: InputMaybe<SkillsUpdateManyWithoutAthleteNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAthleteProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedBy?: InputMaybe<CoachProfileUpdateOneWithoutVerifiedAthletesNestedInput>;
};

export type AthleteProfileUpdateWithoutUserInput = {
  coachContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutAthleteProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutAthleteNestedInput>;
  gpa?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graduationYear?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hudlLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutAthleteNestedInput>;
  playerCardUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  position?: InputMaybe<PositionUpdateOneWithoutAthleteProfilesNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitingContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingRelationship?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesNestedInput>;
  skills?: InputMaybe<SkillsUpdateManyWithoutAthleteNestedInput>;
  transcripts?: InputMaybe<TranscriptsUpdateManyWithoutAthleteProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedBy?: InputMaybe<CoachProfileUpdateOneWithoutVerifiedAthletesNestedInput>;
};

export type AthleteProfileUpdateWithoutVerifiedByInput = {
  coachContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachContactTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutAthleteProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutAthleteNestedInput>;
  gpa?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graduationYear?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hudlLink?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutAthleteNestedInput>;
  playerCardUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  position?: InputMaybe<PositionUpdateOneWithoutAthleteProfilesNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutAthleteNestedInput>;
  recruitingContactName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingPhoneNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recruitingRelationship?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesNestedInput>;
  skills?: InputMaybe<SkillsUpdateManyWithoutAthleteNestedInput>;
  transcripts?: InputMaybe<TranscriptsUpdateManyWithoutAthleteProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAthleteProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type AthleteProfileUpsertWithWhereUniqueWithoutCountryInput = {
  create: AthleteProfileCreateWithoutCountryInput;
  update: AthleteProfileUpdateWithoutCountryInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileUpsertWithWhereUniqueWithoutPositionInput = {
  create: AthleteProfileCreateWithoutPositionInput;
  update: AthleteProfileUpdateWithoutPositionInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileUpsertWithWhereUniqueWithoutSchoolInput = {
  create: AthleteProfileCreateWithoutSchoolInput;
  update: AthleteProfileUpdateWithoutSchoolInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileUpsertWithWhereUniqueWithoutVerifiedByInput = {
  create: AthleteProfileCreateWithoutVerifiedByInput;
  update: AthleteProfileUpdateWithoutVerifiedByInput;
  where: AthleteProfileWhereUniqueInput;
};

export type AthleteProfileUpsertWithoutEvaluationsInput = {
  create: AthleteProfileCreateWithoutEvaluationsInput;
  update: AthleteProfileUpdateWithoutEvaluationsInput;
};

export type AthleteProfileUpsertWithoutInterestedSchoolsInput = {
  create: AthleteProfileCreateWithoutInterestedSchoolsInput;
  update: AthleteProfileUpdateWithoutInterestedSchoolsInput;
};

export type AthleteProfileUpsertWithoutProspectedSchoolsInput = {
  create: AthleteProfileCreateWithoutProspectedSchoolsInput;
  update: AthleteProfileUpdateWithoutProspectedSchoolsInput;
};

export type AthleteProfileUpsertWithoutRecruitedSchoolsInput = {
  create: AthleteProfileCreateWithoutRecruitedSchoolsInput;
  update: AthleteProfileUpdateWithoutRecruitedSchoolsInput;
};

export type AthleteProfileUpsertWithoutSkillsInput = {
  create: AthleteProfileCreateWithoutSkillsInput;
  update: AthleteProfileUpdateWithoutSkillsInput;
};

export type AthleteProfileUpsertWithoutTranscriptsInput = {
  create: AthleteProfileCreateWithoutTranscriptsInput;
  update: AthleteProfileUpdateWithoutTranscriptsInput;
};

export type AthleteProfileUpsertWithoutUserInput = {
  create: AthleteProfileCreateWithoutUserInput;
  update: AthleteProfileUpdateWithoutUserInput;
};

export type AthleteProfileWhereInput = {
  AND?: InputMaybe<Array<AthleteProfileWhereInput>>;
  NOT?: InputMaybe<Array<AthleteProfileWhereInput>>;
  OR?: InputMaybe<Array<AthleteProfileWhereInput>>;
  coachContactName?: InputMaybe<StringNullableFilter>;
  coachContactPhoneNumber?: InputMaybe<StringNullableFilter>;
  coachContactTitle?: InputMaybe<StringNullableFilter>;
  country?: InputMaybe<CountryRelationFilter>;
  countryId?: InputMaybe<BigIntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  evaluations?: InputMaybe<EvaluationListRelationFilter>;
  gpa?: InputMaybe<StringNullableFilter>;
  graduationYear?: InputMaybe<StringNullableFilter>;
  hudlLink?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<BigIntFilter>;
  interestedSchools?: InputMaybe<InterestedSchoolsListRelationFilter>;
  playerCardUrl?: InputMaybe<StringNullableFilter>;
  position?: InputMaybe<PositionRelationFilter>;
  positionId?: InputMaybe<BigIntNullableFilter>;
  prospectedSchools?: InputMaybe<ProspectedAthleteListRelationFilter>;
  recruitedSchools?: InputMaybe<RecruitedAthleteListRelationFilter>;
  recruitingContactName?: InputMaybe<StringNullableFilter>;
  recruitingPhoneNumber?: InputMaybe<StringNullableFilter>;
  recruitingRelationship?: InputMaybe<StringNullableFilter>;
  school?: InputMaybe<SchoolRelationFilter>;
  schoolId?: InputMaybe<BigIntFilter>;
  skills?: InputMaybe<SkillsListRelationFilter>;
  transcripts?: InputMaybe<TranscriptsListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
  verified?: InputMaybe<BoolFilter>;
  verifiedBy?: InputMaybe<CoachProfileRelationFilter>;
  verifiedById?: InputMaybe<BigIntNullableFilter>;
};

export type AthleteProfileWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type BigIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['BigInt']['input']>;
  divide?: InputMaybe<Scalars['BigInt']['input']>;
  increment?: InputMaybe<Scalars['BigInt']['input']>;
  multiply?: InputMaybe<Scalars['BigInt']['input']>;
  set?: InputMaybe<Scalars['BigInt']['input']>;
};

export type BigIntFilter = {
  equals?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  not?: InputMaybe<NestedBigIntFilter>;
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type BigIntNullableFilter = {
  equals?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  not?: InputMaybe<NestedBigIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type BigIntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedBigIntNullableFilter>;
  _min?: InputMaybe<NestedBigIntNullableFilter>;
  _sum?: InputMaybe<NestedBigIntNullableFilter>;
  equals?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  not?: InputMaybe<NestedBigIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type BigIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBigIntFilter>;
  _min?: InputMaybe<NestedBigIntFilter>;
  _sum?: InputMaybe<NestedBigIntFilter>;
  equals?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  not?: InputMaybe<NestedBigIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type Blocks = {
  __typename?: 'Blocks';
  blocked: User;
  blockedBy: User;
  blockedById: Scalars['BigInt']['output'];
  blockedId: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BlocksAvgAggregate = {
  __typename?: 'BlocksAvgAggregate';
  blockedById?: Maybe<Scalars['Float']['output']>;
  blockedId?: Maybe<Scalars['Float']['output']>;
};

export type BlocksAvgOrderByAggregateInput = {
  blockedById?: InputMaybe<SortOrder>;
  blockedId?: InputMaybe<SortOrder>;
};

export type BlocksBlockedByIdBlockedIdCompoundUniqueInput = {
  blockedById: Scalars['BigInt']['input'];
  blockedId: Scalars['BigInt']['input'];
};

export type BlocksCountAggregate = {
  __typename?: 'BlocksCountAggregate';
  _all: Scalars['Int']['output'];
  blockedById: Scalars['Int']['output'];
  blockedId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type BlocksCountOrderByAggregateInput = {
  blockedById?: InputMaybe<SortOrder>;
  blockedId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BlocksCreateInput = {
  blocked: UserCreateNestedOneWithoutBlockedByUsersInput;
  blockedBy: UserCreateNestedOneWithoutBlockedUsersInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type BlocksCreateManyBlockedByInput = {
  blockedId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type BlocksCreateManyBlockedByInputEnvelope = {
  data: Array<BlocksCreateManyBlockedByInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BlocksCreateManyBlockedInput = {
  blockedById: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type BlocksCreateManyBlockedInputEnvelope = {
  data: Array<BlocksCreateManyBlockedInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BlocksCreateManyInput = {
  blockedById: Scalars['BigInt']['input'];
  blockedId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type BlocksCreateNestedManyWithoutBlockedByInput = {
  connect?: InputMaybe<Array<BlocksWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BlocksCreateOrConnectWithoutBlockedByInput>>;
  create?: InputMaybe<Array<BlocksCreateWithoutBlockedByInput>>;
  createMany?: InputMaybe<BlocksCreateManyBlockedByInputEnvelope>;
};

export type BlocksCreateNestedManyWithoutBlockedInput = {
  connect?: InputMaybe<Array<BlocksWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BlocksCreateOrConnectWithoutBlockedInput>>;
  create?: InputMaybe<Array<BlocksCreateWithoutBlockedInput>>;
  createMany?: InputMaybe<BlocksCreateManyBlockedInputEnvelope>;
};

export type BlocksCreateOrConnectWithoutBlockedByInput = {
  create: BlocksCreateWithoutBlockedByInput;
  where: BlocksWhereUniqueInput;
};

export type BlocksCreateOrConnectWithoutBlockedInput = {
  create: BlocksCreateWithoutBlockedInput;
  where: BlocksWhereUniqueInput;
};

export type BlocksCreateWithoutBlockedByInput = {
  blocked: UserCreateNestedOneWithoutBlockedByUsersInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type BlocksCreateWithoutBlockedInput = {
  blockedBy: UserCreateNestedOneWithoutBlockedUsersInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type BlocksGroupBy = {
  __typename?: 'BlocksGroupBy';
  _avg?: Maybe<BlocksAvgAggregate>;
  _count?: Maybe<BlocksCountAggregate>;
  _max?: Maybe<BlocksMaxAggregate>;
  _min?: Maybe<BlocksMinAggregate>;
  _sum?: Maybe<BlocksSumAggregate>;
  blockedById: Scalars['BigInt']['output'];
  blockedId: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BlocksListRelationFilter = {
  every?: InputMaybe<BlocksWhereInput>;
  none?: InputMaybe<BlocksWhereInput>;
  some?: InputMaybe<BlocksWhereInput>;
};

export type BlocksMaxAggregate = {
  __typename?: 'BlocksMaxAggregate';
  blockedById?: Maybe<Scalars['BigInt']['output']>;
  blockedId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BlocksMaxOrderByAggregateInput = {
  blockedById?: InputMaybe<SortOrder>;
  blockedId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BlocksMinAggregate = {
  __typename?: 'BlocksMinAggregate';
  blockedById?: Maybe<Scalars['BigInt']['output']>;
  blockedId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BlocksMinOrderByAggregateInput = {
  blockedById?: InputMaybe<SortOrder>;
  blockedId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BlocksOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type BlocksOrderByWithAggregationInput = {
  _avg?: InputMaybe<BlocksAvgOrderByAggregateInput>;
  _count?: InputMaybe<BlocksCountOrderByAggregateInput>;
  _max?: InputMaybe<BlocksMaxOrderByAggregateInput>;
  _min?: InputMaybe<BlocksMinOrderByAggregateInput>;
  _sum?: InputMaybe<BlocksSumOrderByAggregateInput>;
  blockedById?: InputMaybe<SortOrder>;
  blockedId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BlocksOrderByWithRelationInput = {
  blocked?: InputMaybe<UserOrderByWithRelationInput>;
  blockedBy?: InputMaybe<UserOrderByWithRelationInput>;
  blockedById?: InputMaybe<SortOrder>;
  blockedId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum BlocksScalarFieldEnum {
  BlockedById = 'blockedById',
  BlockedId = 'blockedId',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export type BlocksScalarWhereInput = {
  AND?: InputMaybe<Array<BlocksScalarWhereInput>>;
  NOT?: InputMaybe<Array<BlocksScalarWhereInput>>;
  OR?: InputMaybe<Array<BlocksScalarWhereInput>>;
  blockedById?: InputMaybe<BigIntFilter>;
  blockedId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BlocksScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<BlocksScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<BlocksScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<BlocksScalarWhereWithAggregatesInput>>;
  blockedById?: InputMaybe<BigIntWithAggregatesFilter>;
  blockedId?: InputMaybe<BigIntWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type BlocksSumAggregate = {
  __typename?: 'BlocksSumAggregate';
  blockedById?: Maybe<Scalars['BigInt']['output']>;
  blockedId?: Maybe<Scalars['BigInt']['output']>;
};

export type BlocksSumOrderByAggregateInput = {
  blockedById?: InputMaybe<SortOrder>;
  blockedId?: InputMaybe<SortOrder>;
};

export type BlocksUpdateInput = {
  blocked?: InputMaybe<UserUpdateOneRequiredWithoutBlockedByUsersNestedInput>;
  blockedBy?: InputMaybe<UserUpdateOneRequiredWithoutBlockedUsersNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BlocksUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BlocksUpdateManyWithWhereWithoutBlockedByInput = {
  data: BlocksUpdateManyMutationInput;
  where: BlocksScalarWhereInput;
};

export type BlocksUpdateManyWithWhereWithoutBlockedInput = {
  data: BlocksUpdateManyMutationInput;
  where: BlocksScalarWhereInput;
};

export type BlocksUpdateManyWithoutBlockedByNestedInput = {
  connect?: InputMaybe<Array<BlocksWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BlocksCreateOrConnectWithoutBlockedByInput>>;
  create?: InputMaybe<Array<BlocksCreateWithoutBlockedByInput>>;
  createMany?: InputMaybe<BlocksCreateManyBlockedByInputEnvelope>;
  delete?: InputMaybe<Array<BlocksWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BlocksScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BlocksWhereUniqueInput>>;
  set?: InputMaybe<Array<BlocksWhereUniqueInput>>;
  update?: InputMaybe<Array<BlocksUpdateWithWhereUniqueWithoutBlockedByInput>>;
  updateMany?: InputMaybe<Array<BlocksUpdateManyWithWhereWithoutBlockedByInput>>;
  upsert?: InputMaybe<Array<BlocksUpsertWithWhereUniqueWithoutBlockedByInput>>;
};

export type BlocksUpdateManyWithoutBlockedNestedInput = {
  connect?: InputMaybe<Array<BlocksWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BlocksCreateOrConnectWithoutBlockedInput>>;
  create?: InputMaybe<Array<BlocksCreateWithoutBlockedInput>>;
  createMany?: InputMaybe<BlocksCreateManyBlockedInputEnvelope>;
  delete?: InputMaybe<Array<BlocksWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BlocksScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BlocksWhereUniqueInput>>;
  set?: InputMaybe<Array<BlocksWhereUniqueInput>>;
  update?: InputMaybe<Array<BlocksUpdateWithWhereUniqueWithoutBlockedInput>>;
  updateMany?: InputMaybe<Array<BlocksUpdateManyWithWhereWithoutBlockedInput>>;
  upsert?: InputMaybe<Array<BlocksUpsertWithWhereUniqueWithoutBlockedInput>>;
};

export type BlocksUpdateWithWhereUniqueWithoutBlockedByInput = {
  data: BlocksUpdateWithoutBlockedByInput;
  where: BlocksWhereUniqueInput;
};

export type BlocksUpdateWithWhereUniqueWithoutBlockedInput = {
  data: BlocksUpdateWithoutBlockedInput;
  where: BlocksWhereUniqueInput;
};

export type BlocksUpdateWithoutBlockedByInput = {
  blocked?: InputMaybe<UserUpdateOneRequiredWithoutBlockedByUsersNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BlocksUpdateWithoutBlockedInput = {
  blockedBy?: InputMaybe<UserUpdateOneRequiredWithoutBlockedUsersNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BlocksUpsertWithWhereUniqueWithoutBlockedByInput = {
  create: BlocksCreateWithoutBlockedByInput;
  update: BlocksUpdateWithoutBlockedByInput;
  where: BlocksWhereUniqueInput;
};

export type BlocksUpsertWithWhereUniqueWithoutBlockedInput = {
  create: BlocksCreateWithoutBlockedInput;
  update: BlocksUpdateWithoutBlockedInput;
  where: BlocksWhereUniqueInput;
};

export type BlocksWhereInput = {
  AND?: InputMaybe<Array<BlocksWhereInput>>;
  NOT?: InputMaybe<Array<BlocksWhereInput>>;
  OR?: InputMaybe<Array<BlocksWhereInput>>;
  blocked?: InputMaybe<UserRelationFilter>;
  blockedBy?: InputMaybe<UserRelationFilter>;
  blockedById?: InputMaybe<BigIntFilter>;
  blockedId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BlocksWhereUniqueInput = {
  blockedById_blockedId?: InputMaybe<BlocksBlockedByIdBlockedIdCompoundUniqueInput>;
};

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type BoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type BoolNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedBoolNullableFilter>;
  _min?: InputMaybe<NestedBoolNullableFilter>;
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolNullableWithAggregatesFilter>;
};

export type BoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type CoachProfile = {
  __typename?: 'CoachProfile';
  _count?: Maybe<CoachProfileCount>;
  canReceiveMessages?: Maybe<Scalars['Boolean']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Country>;
  countryId?: Maybe<Scalars['BigInt']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  school: School;
  schoolId: Scalars['BigInt']['output'];
  state?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
  verifiedAthletes: Array<AthleteProfile>;
};


export type CoachProfileVerifiedAthletesArgs = {
  cursor?: InputMaybe<AthleteProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<AthleteProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AthleteProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AthleteProfileWhereInput>;
};

export type CoachProfileAvgAggregate = {
  __typename?: 'CoachProfileAvgAggregate';
  countryId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  schoolId?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type CoachProfileAvgOrderByAggregateInput = {
  countryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type CoachProfileCount = {
  __typename?: 'CoachProfileCount';
  verifiedAthletes: Scalars['Int']['output'];
};

export type CoachProfileCountAggregate = {
  __typename?: 'CoachProfileCountAggregate';
  _all: Scalars['Int']['output'];
  canReceiveMessages: Scalars['Int']['output'];
  city: Scalars['Int']['output'];
  countryId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  schoolId: Scalars['Int']['output'];
  state: Scalars['Int']['output'];
  title: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type CoachProfileCountOrderByAggregateInput = {
  canReceiveMessages?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  countryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CoachProfileCreateInput = {
  canReceiveMessages?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutCoachProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  school: SchoolCreateNestedOneWithoutCoachesInput;
  state?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutCoachProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verifiedAthletes?: InputMaybe<AthleteProfileCreateNestedManyWithoutVerifiedByInput>;
};

export type CoachProfileCreateManyCountryInput = {
  canReceiveMessages?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  schoolId: Scalars['BigInt']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CoachProfileCreateManyCountryInputEnvelope = {
  data: Array<CoachProfileCreateManyCountryInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CoachProfileCreateManyInput = {
  canReceiveMessages?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  schoolId: Scalars['BigInt']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CoachProfileCreateManySchoolInput = {
  canReceiveMessages?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CoachProfileCreateManySchoolInputEnvelope = {
  data: Array<CoachProfileCreateManySchoolInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CoachProfileCreateNestedManyWithoutCountryInput = {
  connect?: InputMaybe<Array<CoachProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CoachProfileCreateOrConnectWithoutCountryInput>>;
  create?: InputMaybe<Array<CoachProfileCreateWithoutCountryInput>>;
  createMany?: InputMaybe<CoachProfileCreateManyCountryInputEnvelope>;
};

export type CoachProfileCreateNestedManyWithoutSchoolInput = {
  connect?: InputMaybe<Array<CoachProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CoachProfileCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<CoachProfileCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<CoachProfileCreateManySchoolInputEnvelope>;
};

export type CoachProfileCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<CoachProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CoachProfileCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<CoachProfileCreateWithoutUserInput>;
};

export type CoachProfileCreateNestedOneWithoutVerifiedAthletesInput = {
  connect?: InputMaybe<CoachProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CoachProfileCreateOrConnectWithoutVerifiedAthletesInput>;
  create?: InputMaybe<CoachProfileCreateWithoutVerifiedAthletesInput>;
};

export type CoachProfileCreateOrConnectWithoutCountryInput = {
  create: CoachProfileCreateWithoutCountryInput;
  where: CoachProfileWhereUniqueInput;
};

export type CoachProfileCreateOrConnectWithoutSchoolInput = {
  create: CoachProfileCreateWithoutSchoolInput;
  where: CoachProfileWhereUniqueInput;
};

export type CoachProfileCreateOrConnectWithoutUserInput = {
  create: CoachProfileCreateWithoutUserInput;
  where: CoachProfileWhereUniqueInput;
};

export type CoachProfileCreateOrConnectWithoutVerifiedAthletesInput = {
  create: CoachProfileCreateWithoutVerifiedAthletesInput;
  where: CoachProfileWhereUniqueInput;
};

export type CoachProfileCreateWithoutCountryInput = {
  canReceiveMessages?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  school: SchoolCreateNestedOneWithoutCoachesInput;
  state?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutCoachProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verifiedAthletes?: InputMaybe<AthleteProfileCreateNestedManyWithoutVerifiedByInput>;
};

export type CoachProfileCreateWithoutSchoolInput = {
  canReceiveMessages?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutCoachProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutCoachProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verifiedAthletes?: InputMaybe<AthleteProfileCreateNestedManyWithoutVerifiedByInput>;
};

export type CoachProfileCreateWithoutUserInput = {
  canReceiveMessages?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutCoachProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  school: SchoolCreateNestedOneWithoutCoachesInput;
  state?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verifiedAthletes?: InputMaybe<AthleteProfileCreateNestedManyWithoutVerifiedByInput>;
};

export type CoachProfileCreateWithoutVerifiedAthletesInput = {
  canReceiveMessages?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<CountryCreateNestedOneWithoutCoachProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  school: SchoolCreateNestedOneWithoutCoachesInput;
  state?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutCoachProfileInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CoachProfileGroupBy = {
  __typename?: 'CoachProfileGroupBy';
  _avg?: Maybe<CoachProfileAvgAggregate>;
  _count?: Maybe<CoachProfileCountAggregate>;
  _max?: Maybe<CoachProfileMaxAggregate>;
  _min?: Maybe<CoachProfileMinAggregate>;
  _sum?: Maybe<CoachProfileSumAggregate>;
  canReceiveMessages?: Maybe<Scalars['Boolean']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  countryId?: Maybe<Scalars['BigInt']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  schoolId: Scalars['BigInt']['output'];
  state?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
};

export type CoachProfileListRelationFilter = {
  every?: InputMaybe<CoachProfileWhereInput>;
  none?: InputMaybe<CoachProfileWhereInput>;
  some?: InputMaybe<CoachProfileWhereInput>;
};

export type CoachProfileMaxAggregate = {
  __typename?: 'CoachProfileMaxAggregate';
  canReceiveMessages?: Maybe<Scalars['Boolean']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  countryId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type CoachProfileMaxOrderByAggregateInput = {
  canReceiveMessages?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  countryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CoachProfileMinAggregate = {
  __typename?: 'CoachProfileMinAggregate';
  canReceiveMessages?: Maybe<Scalars['Boolean']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  countryId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type CoachProfileMinOrderByAggregateInput = {
  canReceiveMessages?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  countryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CoachProfileOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CoachProfileOrderByWithAggregationInput = {
  _avg?: InputMaybe<CoachProfileAvgOrderByAggregateInput>;
  _count?: InputMaybe<CoachProfileCountOrderByAggregateInput>;
  _max?: InputMaybe<CoachProfileMaxOrderByAggregateInput>;
  _min?: InputMaybe<CoachProfileMinOrderByAggregateInput>;
  _sum?: InputMaybe<CoachProfileSumOrderByAggregateInput>;
  canReceiveMessages?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  countryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CoachProfileOrderByWithRelationInput = {
  canReceiveMessages?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  country?: InputMaybe<CountryOrderByWithRelationInput>;
  countryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  school?: InputMaybe<SchoolOrderByWithRelationInput>;
  schoolId?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  verifiedAthletes?: InputMaybe<AthleteProfileOrderByRelationAggregateInput>;
};

export type CoachProfileRelationFilter = {
  is?: InputMaybe<CoachProfileWhereInput>;
  isNot?: InputMaybe<CoachProfileWhereInput>;
};

export enum CoachProfileScalarFieldEnum {
  CanReceiveMessages = 'canReceiveMessages',
  City = 'city',
  CountryId = 'countryId',
  CreatedAt = 'createdAt',
  Id = 'id',
  SchoolId = 'schoolId',
  State = 'state',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  Uuid = 'uuid'
}

export type CoachProfileScalarWhereInput = {
  AND?: InputMaybe<Array<CoachProfileScalarWhereInput>>;
  NOT?: InputMaybe<Array<CoachProfileScalarWhereInput>>;
  OR?: InputMaybe<Array<CoachProfileScalarWhereInput>>;
  canReceiveMessages?: InputMaybe<BoolNullableFilter>;
  city?: InputMaybe<StringNullableFilter>;
  countryId?: InputMaybe<BigIntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  schoolId?: InputMaybe<BigIntFilter>;
  state?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type CoachProfileScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CoachProfileScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<CoachProfileScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CoachProfileScalarWhereWithAggregatesInput>>;
  canReceiveMessages?: InputMaybe<BoolNullableWithAggregatesFilter>;
  city?: InputMaybe<StringNullableWithAggregatesFilter>;
  countryId?: InputMaybe<BigIntNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  schoolId?: InputMaybe<BigIntWithAggregatesFilter>;
  state?: InputMaybe<StringNullableWithAggregatesFilter>;
  title?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<BigIntWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
};

export type CoachProfileSchoolIdUserIdCompoundUniqueInput = {
  schoolId: Scalars['BigInt']['input'];
  userId: Scalars['BigInt']['input'];
};

export type CoachProfileSumAggregate = {
  __typename?: 'CoachProfileSumAggregate';
  countryId?: Maybe<Scalars['BigInt']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type CoachProfileSumOrderByAggregateInput = {
  countryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type CoachProfileUpdateInput = {
  canReceiveMessages?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutCoachProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutCoachesNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutCoachProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verifiedAthletes?: InputMaybe<AthleteProfileUpdateManyWithoutVerifiedByNestedInput>;
};

export type CoachProfileUpdateManyMutationInput = {
  canReceiveMessages?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CoachProfileUpdateManyWithWhereWithoutCountryInput = {
  data: CoachProfileUpdateManyMutationInput;
  where: CoachProfileScalarWhereInput;
};

export type CoachProfileUpdateManyWithWhereWithoutSchoolInput = {
  data: CoachProfileUpdateManyMutationInput;
  where: CoachProfileScalarWhereInput;
};

export type CoachProfileUpdateManyWithoutCountryNestedInput = {
  connect?: InputMaybe<Array<CoachProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CoachProfileCreateOrConnectWithoutCountryInput>>;
  create?: InputMaybe<Array<CoachProfileCreateWithoutCountryInput>>;
  createMany?: InputMaybe<CoachProfileCreateManyCountryInputEnvelope>;
  delete?: InputMaybe<Array<CoachProfileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CoachProfileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CoachProfileWhereUniqueInput>>;
  set?: InputMaybe<Array<CoachProfileWhereUniqueInput>>;
  update?: InputMaybe<Array<CoachProfileUpdateWithWhereUniqueWithoutCountryInput>>;
  updateMany?: InputMaybe<Array<CoachProfileUpdateManyWithWhereWithoutCountryInput>>;
  upsert?: InputMaybe<Array<CoachProfileUpsertWithWhereUniqueWithoutCountryInput>>;
};

export type CoachProfileUpdateManyWithoutSchoolNestedInput = {
  connect?: InputMaybe<Array<CoachProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CoachProfileCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<CoachProfileCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<CoachProfileCreateManySchoolInputEnvelope>;
  delete?: InputMaybe<Array<CoachProfileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CoachProfileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CoachProfileWhereUniqueInput>>;
  set?: InputMaybe<Array<CoachProfileWhereUniqueInput>>;
  update?: InputMaybe<Array<CoachProfileUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: InputMaybe<Array<CoachProfileUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: InputMaybe<Array<CoachProfileUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type CoachProfileUpdateOneWithoutUserNestedInput = {
  connect?: InputMaybe<CoachProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CoachProfileCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<CoachProfileCreateWithoutUserInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<CoachProfileUpdateWithoutUserInput>;
  upsert?: InputMaybe<CoachProfileUpsertWithoutUserInput>;
};

export type CoachProfileUpdateOneWithoutVerifiedAthletesNestedInput = {
  connect?: InputMaybe<CoachProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CoachProfileCreateOrConnectWithoutVerifiedAthletesInput>;
  create?: InputMaybe<CoachProfileCreateWithoutVerifiedAthletesInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<CoachProfileUpdateWithoutVerifiedAthletesInput>;
  upsert?: InputMaybe<CoachProfileUpsertWithoutVerifiedAthletesInput>;
};

export type CoachProfileUpdateWithWhereUniqueWithoutCountryInput = {
  data: CoachProfileUpdateWithoutCountryInput;
  where: CoachProfileWhereUniqueInput;
};

export type CoachProfileUpdateWithWhereUniqueWithoutSchoolInput = {
  data: CoachProfileUpdateWithoutSchoolInput;
  where: CoachProfileWhereUniqueInput;
};

export type CoachProfileUpdateWithoutCountryInput = {
  canReceiveMessages?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutCoachesNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutCoachProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verifiedAthletes?: InputMaybe<AthleteProfileUpdateManyWithoutVerifiedByNestedInput>;
};

export type CoachProfileUpdateWithoutSchoolInput = {
  canReceiveMessages?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutCoachProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutCoachProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verifiedAthletes?: InputMaybe<AthleteProfileUpdateManyWithoutVerifiedByNestedInput>;
};

export type CoachProfileUpdateWithoutUserInput = {
  canReceiveMessages?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutCoachProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutCoachesNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  verifiedAthletes?: InputMaybe<AthleteProfileUpdateManyWithoutVerifiedByNestedInput>;
};

export type CoachProfileUpdateWithoutVerifiedAthletesInput = {
  canReceiveMessages?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  country?: InputMaybe<CountryUpdateOneWithoutCoachProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutCoachesNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutCoachProfileNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CoachProfileUpsertWithWhereUniqueWithoutCountryInput = {
  create: CoachProfileCreateWithoutCountryInput;
  update: CoachProfileUpdateWithoutCountryInput;
  where: CoachProfileWhereUniqueInput;
};

export type CoachProfileUpsertWithWhereUniqueWithoutSchoolInput = {
  create: CoachProfileCreateWithoutSchoolInput;
  update: CoachProfileUpdateWithoutSchoolInput;
  where: CoachProfileWhereUniqueInput;
};

export type CoachProfileUpsertWithoutUserInput = {
  create: CoachProfileCreateWithoutUserInput;
  update: CoachProfileUpdateWithoutUserInput;
};

export type CoachProfileUpsertWithoutVerifiedAthletesInput = {
  create: CoachProfileCreateWithoutVerifiedAthletesInput;
  update: CoachProfileUpdateWithoutVerifiedAthletesInput;
};

export type CoachProfileWhereInput = {
  AND?: InputMaybe<Array<CoachProfileWhereInput>>;
  NOT?: InputMaybe<Array<CoachProfileWhereInput>>;
  OR?: InputMaybe<Array<CoachProfileWhereInput>>;
  canReceiveMessages?: InputMaybe<BoolNullableFilter>;
  city?: InputMaybe<StringNullableFilter>;
  country?: InputMaybe<CountryRelationFilter>;
  countryId?: InputMaybe<BigIntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  school?: InputMaybe<SchoolRelationFilter>;
  schoolId?: InputMaybe<BigIntFilter>;
  state?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
  verifiedAthletes?: InputMaybe<AthleteProfileListRelationFilter>;
};

export type CoachProfileWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  schoolId_userId?: InputMaybe<CoachProfileSchoolIdUserIdCompoundUniqueInput>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type Comment = {
  __typename?: 'Comment';
  _count?: Maybe<CommentCount>;
  commentLikes: Array<CommentLike>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  post: Post;
  postId: Scalars['BigInt']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
};


export type CommentCommentLikesArgs = {
  cursor?: InputMaybe<CommentLikeWhereUniqueInput>;
  distinct?: InputMaybe<Array<CommentLikeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CommentLikeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentLikeWhereInput>;
};

export type CommentAvgAggregate = {
  __typename?: 'CommentAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  postId?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type CommentAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type CommentCount = {
  __typename?: 'CommentCount';
  commentLikes: Scalars['Int']['output'];
};

export type CommentCountAggregate = {
  __typename?: 'CommentCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  postId: Scalars['Int']['output'];
  text: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type CommentCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CommentCreateInput = {
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutCommentInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  post: PostCreateNestedOneWithoutCommentsInput;
  text: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutCommentsInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  postId: Scalars['BigInt']['input'];
  text: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentCreateManyPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  text: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentCreateManyPostInputEnvelope = {
  data: Array<CommentCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CommentCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  postId: Scalars['BigInt']['input'];
  text: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentCreateManyUserInputEnvelope = {
  data: Array<CommentCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CommentCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommentCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<CommentCreateWithoutPostInput>>;
  createMany?: InputMaybe<CommentCreateManyPostInputEnvelope>;
};

export type CommentCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommentCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<CommentCreateWithoutUserInput>>;
  createMany?: InputMaybe<CommentCreateManyUserInputEnvelope>;
};

export type CommentCreateNestedOneWithoutCommentLikesInput = {
  connect?: InputMaybe<CommentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CommentCreateOrConnectWithoutCommentLikesInput>;
  create?: InputMaybe<CommentCreateWithoutCommentLikesInput>;
};

export type CommentCreateOrConnectWithoutCommentLikesInput = {
  create: CommentCreateWithoutCommentLikesInput;
  where: CommentWhereUniqueInput;
};

export type CommentCreateOrConnectWithoutPostInput = {
  create: CommentCreateWithoutPostInput;
  where: CommentWhereUniqueInput;
};

export type CommentCreateOrConnectWithoutUserInput = {
  create: CommentCreateWithoutUserInput;
  where: CommentWhereUniqueInput;
};

export type CommentCreateWithoutCommentLikesInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  post: PostCreateNestedOneWithoutCommentsInput;
  text: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutCommentsInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentCreateWithoutPostInput = {
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutCommentInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  text: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutCommentsInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentCreateWithoutUserInput = {
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutCommentInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  post: PostCreateNestedOneWithoutCommentsInput;
  text: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentGroupBy = {
  __typename?: 'CommentGroupBy';
  _avg?: Maybe<CommentAvgAggregate>;
  _count?: Maybe<CommentCountAggregate>;
  _max?: Maybe<CommentMaxAggregate>;
  _min?: Maybe<CommentMinAggregate>;
  _sum?: Maybe<CommentSumAggregate>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  postId: Scalars['BigInt']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
};

export type CommentLike = {
  __typename?: 'CommentLike';
  comment: Comment;
  commentId: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
};

export type CommentLikeAvgAggregate = {
  __typename?: 'CommentLikeAvgAggregate';
  commentId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type CommentLikeAvgOrderByAggregateInput = {
  commentId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type CommentLikeCountAggregate = {
  __typename?: 'CommentLikeCountAggregate';
  _all: Scalars['Int']['output'];
  commentId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type CommentLikeCountOrderByAggregateInput = {
  commentId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CommentLikeCreateInput = {
  comment: CommentCreateNestedOneWithoutCommentLikesInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutCommentLikesInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentLikeCreateManyCommentInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentLikeCreateManyCommentInputEnvelope = {
  data: Array<CommentLikeCreateManyCommentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CommentLikeCreateManyInput = {
  commentId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentLikeCreateManyUserInput = {
  commentId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentLikeCreateManyUserInputEnvelope = {
  data: Array<CommentLikeCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CommentLikeCreateNestedManyWithoutCommentInput = {
  connect?: InputMaybe<Array<CommentLikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommentLikeCreateOrConnectWithoutCommentInput>>;
  create?: InputMaybe<Array<CommentLikeCreateWithoutCommentInput>>;
  createMany?: InputMaybe<CommentLikeCreateManyCommentInputEnvelope>;
};

export type CommentLikeCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<CommentLikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommentLikeCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<CommentLikeCreateWithoutUserInput>>;
  createMany?: InputMaybe<CommentLikeCreateManyUserInputEnvelope>;
};

export type CommentLikeCreateOrConnectWithoutCommentInput = {
  create: CommentLikeCreateWithoutCommentInput;
  where: CommentLikeWhereUniqueInput;
};

export type CommentLikeCreateOrConnectWithoutUserInput = {
  create: CommentLikeCreateWithoutUserInput;
  where: CommentLikeWhereUniqueInput;
};

export type CommentLikeCreateWithoutCommentInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutCommentLikesInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentLikeCreateWithoutUserInput = {
  comment: CommentCreateNestedOneWithoutCommentLikesInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentLikeGroupBy = {
  __typename?: 'CommentLikeGroupBy';
  _avg?: Maybe<CommentLikeAvgAggregate>;
  _count?: Maybe<CommentLikeCountAggregate>;
  _max?: Maybe<CommentLikeMaxAggregate>;
  _min?: Maybe<CommentLikeMinAggregate>;
  _sum?: Maybe<CommentLikeSumAggregate>;
  commentId: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
};

export type CommentLikeListRelationFilter = {
  every?: InputMaybe<CommentLikeWhereInput>;
  none?: InputMaybe<CommentLikeWhereInput>;
  some?: InputMaybe<CommentLikeWhereInput>;
};

export type CommentLikeMaxAggregate = {
  __typename?: 'CommentLikeMaxAggregate';
  commentId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type CommentLikeMaxOrderByAggregateInput = {
  commentId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CommentLikeMinAggregate = {
  __typename?: 'CommentLikeMinAggregate';
  commentId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type CommentLikeMinOrderByAggregateInput = {
  commentId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CommentLikeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CommentLikeOrderByWithAggregationInput = {
  _avg?: InputMaybe<CommentLikeAvgOrderByAggregateInput>;
  _count?: InputMaybe<CommentLikeCountOrderByAggregateInput>;
  _max?: InputMaybe<CommentLikeMaxOrderByAggregateInput>;
  _min?: InputMaybe<CommentLikeMinOrderByAggregateInput>;
  _sum?: InputMaybe<CommentLikeSumOrderByAggregateInput>;
  commentId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CommentLikeOrderByWithRelationInput = {
  comment?: InputMaybe<CommentOrderByWithRelationInput>;
  commentId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export enum CommentLikeScalarFieldEnum {
  CommentId = 'commentId',
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  Uuid = 'uuid'
}

export type CommentLikeScalarWhereInput = {
  AND?: InputMaybe<Array<CommentLikeScalarWhereInput>>;
  NOT?: InputMaybe<Array<CommentLikeScalarWhereInput>>;
  OR?: InputMaybe<Array<CommentLikeScalarWhereInput>>;
  commentId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type CommentLikeScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CommentLikeScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<CommentLikeScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CommentLikeScalarWhereWithAggregatesInput>>;
  commentId?: InputMaybe<BigIntWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<BigIntWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
};

export type CommentLikeSumAggregate = {
  __typename?: 'CommentLikeSumAggregate';
  commentId?: Maybe<Scalars['BigInt']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type CommentLikeSumOrderByAggregateInput = {
  commentId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type CommentLikeUpdateInput = {
  comment?: InputMaybe<CommentUpdateOneRequiredWithoutCommentLikesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutCommentLikesNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CommentLikeUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CommentLikeUpdateManyWithWhereWithoutCommentInput = {
  data: CommentLikeUpdateManyMutationInput;
  where: CommentLikeScalarWhereInput;
};

export type CommentLikeUpdateManyWithWhereWithoutUserInput = {
  data: CommentLikeUpdateManyMutationInput;
  where: CommentLikeScalarWhereInput;
};

export type CommentLikeUpdateManyWithoutCommentNestedInput = {
  connect?: InputMaybe<Array<CommentLikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommentLikeCreateOrConnectWithoutCommentInput>>;
  create?: InputMaybe<Array<CommentLikeCreateWithoutCommentInput>>;
  createMany?: InputMaybe<CommentLikeCreateManyCommentInputEnvelope>;
  delete?: InputMaybe<Array<CommentLikeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CommentLikeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CommentLikeWhereUniqueInput>>;
  set?: InputMaybe<Array<CommentLikeWhereUniqueInput>>;
  update?: InputMaybe<Array<CommentLikeUpdateWithWhereUniqueWithoutCommentInput>>;
  updateMany?: InputMaybe<Array<CommentLikeUpdateManyWithWhereWithoutCommentInput>>;
  upsert?: InputMaybe<Array<CommentLikeUpsertWithWhereUniqueWithoutCommentInput>>;
};

export type CommentLikeUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<CommentLikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommentLikeCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<CommentLikeCreateWithoutUserInput>>;
  createMany?: InputMaybe<CommentLikeCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<CommentLikeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CommentLikeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CommentLikeWhereUniqueInput>>;
  set?: InputMaybe<Array<CommentLikeWhereUniqueInput>>;
  update?: InputMaybe<Array<CommentLikeUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<CommentLikeUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<CommentLikeUpsertWithWhereUniqueWithoutUserInput>>;
};

export type CommentLikeUpdateWithWhereUniqueWithoutCommentInput = {
  data: CommentLikeUpdateWithoutCommentInput;
  where: CommentLikeWhereUniqueInput;
};

export type CommentLikeUpdateWithWhereUniqueWithoutUserInput = {
  data: CommentLikeUpdateWithoutUserInput;
  where: CommentLikeWhereUniqueInput;
};

export type CommentLikeUpdateWithoutCommentInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutCommentLikesNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CommentLikeUpdateWithoutUserInput = {
  comment?: InputMaybe<CommentUpdateOneRequiredWithoutCommentLikesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CommentLikeUpsertWithWhereUniqueWithoutCommentInput = {
  create: CommentLikeCreateWithoutCommentInput;
  update: CommentLikeUpdateWithoutCommentInput;
  where: CommentLikeWhereUniqueInput;
};

export type CommentLikeUpsertWithWhereUniqueWithoutUserInput = {
  create: CommentLikeCreateWithoutUserInput;
  update: CommentLikeUpdateWithoutUserInput;
  where: CommentLikeWhereUniqueInput;
};

export type CommentLikeWhereInput = {
  AND?: InputMaybe<Array<CommentLikeWhereInput>>;
  NOT?: InputMaybe<Array<CommentLikeWhereInput>>;
  OR?: InputMaybe<Array<CommentLikeWhereInput>>;
  comment?: InputMaybe<CommentRelationFilter>;
  commentId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type CommentLikeWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CommentListRelationFilter = {
  every?: InputMaybe<CommentWhereInput>;
  none?: InputMaybe<CommentWhereInput>;
  some?: InputMaybe<CommentWhereInput>;
};

export type CommentMaxAggregate = {
  __typename?: 'CommentMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  postId?: Maybe<Scalars['BigInt']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type CommentMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CommentMinAggregate = {
  __typename?: 'CommentMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  postId?: Maybe<Scalars['BigInt']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type CommentMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CommentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CommentOrderByWithAggregationInput = {
  _avg?: InputMaybe<CommentAvgOrderByAggregateInput>;
  _count?: InputMaybe<CommentCountOrderByAggregateInput>;
  _max?: InputMaybe<CommentMaxOrderByAggregateInput>;
  _min?: InputMaybe<CommentMinOrderByAggregateInput>;
  _sum?: InputMaybe<CommentSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CommentOrderByWithRelationInput = {
  commentLikes?: InputMaybe<CommentLikeOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  post?: InputMaybe<PostOrderByWithRelationInput>;
  postId?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CommentRelationFilter = {
  is?: InputMaybe<CommentWhereInput>;
  isNot?: InputMaybe<CommentWhereInput>;
};

export enum CommentScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  PostId = 'postId',
  Text = 'text',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  Uuid = 'uuid'
}

export type CommentScalarWhereInput = {
  AND?: InputMaybe<Array<CommentScalarWhereInput>>;
  NOT?: InputMaybe<Array<CommentScalarWhereInput>>;
  OR?: InputMaybe<Array<CommentScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  text?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type CommentScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CommentScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<CommentScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CommentScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  postId?: InputMaybe<BigIntWithAggregatesFilter>;
  text?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<BigIntWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
};

export type CommentSumAggregate = {
  __typename?: 'CommentSumAggregate';
  id?: Maybe<Scalars['BigInt']['output']>;
  postId?: Maybe<Scalars['BigInt']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type CommentSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type CommentUpdateInput = {
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutCommentNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutCommentsNestedInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutCommentsNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CommentUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CommentUpdateManyWithWhereWithoutPostInput = {
  data: CommentUpdateManyMutationInput;
  where: CommentScalarWhereInput;
};

export type CommentUpdateManyWithWhereWithoutUserInput = {
  data: CommentUpdateManyMutationInput;
  where: CommentScalarWhereInput;
};

export type CommentUpdateManyWithoutPostNestedInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommentCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<CommentCreateWithoutPostInput>>;
  createMany?: InputMaybe<CommentCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<CommentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CommentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  set?: InputMaybe<Array<CommentWhereUniqueInput>>;
  update?: InputMaybe<Array<CommentUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<CommentUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<CommentUpsertWithWhereUniqueWithoutPostInput>>;
};

export type CommentUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommentCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<CommentCreateWithoutUserInput>>;
  createMany?: InputMaybe<CommentCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<CommentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CommentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  set?: InputMaybe<Array<CommentWhereUniqueInput>>;
  update?: InputMaybe<Array<CommentUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<CommentUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<CommentUpsertWithWhereUniqueWithoutUserInput>>;
};

export type CommentUpdateOneRequiredWithoutCommentLikesNestedInput = {
  connect?: InputMaybe<CommentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CommentCreateOrConnectWithoutCommentLikesInput>;
  create?: InputMaybe<CommentCreateWithoutCommentLikesInput>;
  update?: InputMaybe<CommentUpdateWithoutCommentLikesInput>;
  upsert?: InputMaybe<CommentUpsertWithoutCommentLikesInput>;
};

export type CommentUpdateWithWhereUniqueWithoutPostInput = {
  data: CommentUpdateWithoutPostInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpdateWithWhereUniqueWithoutUserInput = {
  data: CommentUpdateWithoutUserInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpdateWithoutCommentLikesInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutCommentsNestedInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutCommentsNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CommentUpdateWithoutPostInput = {
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutCommentNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutCommentsNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CommentUpdateWithoutUserInput = {
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutCommentNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutCommentsNestedInput>;
  text?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CommentUpsertWithWhereUniqueWithoutPostInput = {
  create: CommentCreateWithoutPostInput;
  update: CommentUpdateWithoutPostInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpsertWithWhereUniqueWithoutUserInput = {
  create: CommentCreateWithoutUserInput;
  update: CommentUpdateWithoutUserInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpsertWithoutCommentLikesInput = {
  create: CommentCreateWithoutCommentLikesInput;
  update: CommentUpdateWithoutCommentLikesInput;
};

export type CommentWhereInput = {
  AND?: InputMaybe<Array<CommentWhereInput>>;
  NOT?: InputMaybe<Array<CommentWhereInput>>;
  OR?: InputMaybe<Array<CommentWhereInput>>;
  commentLikes?: InputMaybe<CommentLikeListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  post?: InputMaybe<PostRelationFilter>;
  postId?: InputMaybe<BigIntFilter>;
  text?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type CommentWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type Country = {
  __typename?: 'Country';
  _count?: Maybe<CountryCount>;
  abbreviation: Scalars['String']['output'];
  athleteProfiles: Array<AthleteProfile>;
  coachProfiles: Array<CoachProfile>;
  createdAt: Scalars['DateTime']['output'];
  flag: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};


export type CountryAthleteProfilesArgs = {
  cursor?: InputMaybe<AthleteProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<AthleteProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AthleteProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AthleteProfileWhereInput>;
};


export type CountryCoachProfilesArgs = {
  cursor?: InputMaybe<CoachProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<CoachProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CoachProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CoachProfileWhereInput>;
};

export type CountryAvgAggregate = {
  __typename?: 'CountryAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type CountryAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type CountryCount = {
  __typename?: 'CountryCount';
  athleteProfiles: Scalars['Int']['output'];
  coachProfiles: Scalars['Int']['output'];
};

export type CountryCountAggregate = {
  __typename?: 'CountryCountAggregate';
  _all: Scalars['Int']['output'];
  abbreviation: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  flag: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type CountryCountOrderByAggregateInput = {
  abbreviation?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  flag?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CountryCreateInput = {
  abbreviation: Scalars['String']['input'];
  athleteProfiles?: InputMaybe<AthleteProfileCreateNestedManyWithoutCountryInput>;
  coachProfiles?: InputMaybe<CoachProfileCreateNestedManyWithoutCountryInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  flag: Scalars['String']['input'];
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CountryCreateManyInput = {
  abbreviation: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  flag: Scalars['String']['input'];
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CountryCreateNestedOneWithoutAthleteProfilesInput = {
  connect?: InputMaybe<CountryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CountryCreateOrConnectWithoutAthleteProfilesInput>;
  create?: InputMaybe<CountryCreateWithoutAthleteProfilesInput>;
};

export type CountryCreateNestedOneWithoutCoachProfilesInput = {
  connect?: InputMaybe<CountryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CountryCreateOrConnectWithoutCoachProfilesInput>;
  create?: InputMaybe<CountryCreateWithoutCoachProfilesInput>;
};

export type CountryCreateOrConnectWithoutAthleteProfilesInput = {
  create: CountryCreateWithoutAthleteProfilesInput;
  where: CountryWhereUniqueInput;
};

export type CountryCreateOrConnectWithoutCoachProfilesInput = {
  create: CountryCreateWithoutCoachProfilesInput;
  where: CountryWhereUniqueInput;
};

export type CountryCreateWithoutAthleteProfilesInput = {
  abbreviation: Scalars['String']['input'];
  coachProfiles?: InputMaybe<CoachProfileCreateNestedManyWithoutCountryInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  flag: Scalars['String']['input'];
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CountryCreateWithoutCoachProfilesInput = {
  abbreviation: Scalars['String']['input'];
  athleteProfiles?: InputMaybe<AthleteProfileCreateNestedManyWithoutCountryInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  flag: Scalars['String']['input'];
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type CountryGroupBy = {
  __typename?: 'CountryGroupBy';
  _avg?: Maybe<CountryAvgAggregate>;
  _count?: Maybe<CountryCountAggregate>;
  _max?: Maybe<CountryMaxAggregate>;
  _min?: Maybe<CountryMinAggregate>;
  _sum?: Maybe<CountrySumAggregate>;
  abbreviation: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  flag: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type CountryMaxAggregate = {
  __typename?: 'CountryMaxAggregate';
  abbreviation?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  flag?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type CountryMaxOrderByAggregateInput = {
  abbreviation?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  flag?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CountryMinAggregate = {
  __typename?: 'CountryMinAggregate';
  abbreviation?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  flag?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type CountryMinOrderByAggregateInput = {
  abbreviation?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  flag?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CountryOrderByWithAggregationInput = {
  _avg?: InputMaybe<CountryAvgOrderByAggregateInput>;
  _count?: InputMaybe<CountryCountOrderByAggregateInput>;
  _max?: InputMaybe<CountryMaxOrderByAggregateInput>;
  _min?: InputMaybe<CountryMinOrderByAggregateInput>;
  _sum?: InputMaybe<CountrySumOrderByAggregateInput>;
  abbreviation?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  flag?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CountryOrderByWithRelationInput = {
  abbreviation?: InputMaybe<SortOrder>;
  athleteProfiles?: InputMaybe<AthleteProfileOrderByRelationAggregateInput>;
  coachProfiles?: InputMaybe<CoachProfileOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  flag?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type CountryRelationFilter = {
  is?: InputMaybe<CountryWhereInput>;
  isNot?: InputMaybe<CountryWhereInput>;
};

export enum CountryScalarFieldEnum {
  Abbreviation = 'abbreviation',
  CreatedAt = 'createdAt',
  Flag = 'flag',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt',
  Uuid = 'uuid'
}

export type CountryScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CountryScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<CountryScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CountryScalarWhereWithAggregatesInput>>;
  abbreviation?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  flag?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
};

export type CountrySumAggregate = {
  __typename?: 'CountrySumAggregate';
  id?: Maybe<Scalars['BigInt']['output']>;
};

export type CountrySumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type CountryUpdateInput = {
  abbreviation?: InputMaybe<StringFieldUpdateOperationsInput>;
  athleteProfiles?: InputMaybe<AthleteProfileUpdateManyWithoutCountryNestedInput>;
  coachProfiles?: InputMaybe<CoachProfileUpdateManyWithoutCountryNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  flag?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CountryUpdateManyMutationInput = {
  abbreviation?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  flag?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CountryUpdateOneWithoutAthleteProfilesNestedInput = {
  connect?: InputMaybe<CountryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CountryCreateOrConnectWithoutAthleteProfilesInput>;
  create?: InputMaybe<CountryCreateWithoutAthleteProfilesInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<CountryUpdateWithoutAthleteProfilesInput>;
  upsert?: InputMaybe<CountryUpsertWithoutAthleteProfilesInput>;
};

export type CountryUpdateOneWithoutCoachProfilesNestedInput = {
  connect?: InputMaybe<CountryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CountryCreateOrConnectWithoutCoachProfilesInput>;
  create?: InputMaybe<CountryCreateWithoutCoachProfilesInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<CountryUpdateWithoutCoachProfilesInput>;
  upsert?: InputMaybe<CountryUpsertWithoutCoachProfilesInput>;
};

export type CountryUpdateWithoutAthleteProfilesInput = {
  abbreviation?: InputMaybe<StringFieldUpdateOperationsInput>;
  coachProfiles?: InputMaybe<CoachProfileUpdateManyWithoutCountryNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  flag?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CountryUpdateWithoutCoachProfilesInput = {
  abbreviation?: InputMaybe<StringFieldUpdateOperationsInput>;
  athleteProfiles?: InputMaybe<AthleteProfileUpdateManyWithoutCountryNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  flag?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CountryUpsertWithoutAthleteProfilesInput = {
  create: CountryCreateWithoutAthleteProfilesInput;
  update: CountryUpdateWithoutAthleteProfilesInput;
};

export type CountryUpsertWithoutCoachProfilesInput = {
  create: CountryCreateWithoutCoachProfilesInput;
  update: CountryUpdateWithoutCoachProfilesInput;
};

export type CountryWhereInput = {
  AND?: InputMaybe<Array<CountryWhereInput>>;
  NOT?: InputMaybe<Array<CountryWhereInput>>;
  OR?: InputMaybe<Array<CountryWhereInput>>;
  abbreviation?: InputMaybe<StringFilter>;
  athleteProfiles?: InputMaybe<AthleteProfileListRelationFilter>;
  coachProfiles?: InputMaybe<CoachProfileListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  flag?: InputMaybe<StringFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type CountryWhereUniqueInput = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedDateTimeNullableFilter>;
  _min?: InputMaybe<NestedDateTimeNullableFilter>;
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type EnumEvaluationTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<EvaluationType>;
};

export type EnumEvaluationTypeFilter = {
  equals?: InputMaybe<EvaluationType>;
  in?: InputMaybe<Array<EvaluationType>>;
  not?: InputMaybe<NestedEnumEvaluationTypeFilter>;
  notIn?: InputMaybe<Array<EvaluationType>>;
};

export type EnumEvaluationTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumEvaluationTypeFilter>;
  _min?: InputMaybe<NestedEnumEvaluationTypeFilter>;
  equals?: InputMaybe<EvaluationType>;
  in?: InputMaybe<Array<EvaluationType>>;
  not?: InputMaybe<NestedEnumEvaluationTypeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<EvaluationType>>;
};

export type EnumVisibilityFieldUpdateOperationsInput = {
  set?: InputMaybe<Visibility>;
};

export type EnumVisibilityFilter = {
  equals?: InputMaybe<Visibility>;
  in?: InputMaybe<Array<Visibility>>;
  not?: InputMaybe<NestedEnumVisibilityFilter>;
  notIn?: InputMaybe<Array<Visibility>>;
};

export type EnumVisibilityWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumVisibilityFilter>;
  _min?: InputMaybe<NestedEnumVisibilityFilter>;
  equals?: InputMaybe<Visibility>;
  in?: InputMaybe<Array<Visibility>>;
  not?: InputMaybe<NestedEnumVisibilityWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Visibility>>;
};

export type Evaluation = {
  __typename?: 'Evaluation';
  athlete: AthleteProfile;
  athleteId: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdById: Scalars['BigInt']['output'];
  evaluationType: EvaluationType;
  id: Scalars['BigInt']['output'];
  images: Array<Scalars['String']['output']>;
  note: Scalars['String']['output'];
  school: School;
  schoolId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  videos: Array<Scalars['String']['output']>;
  videosAspectRatio: Array<Scalars['String']['output']>;
};

export type EvaluationAvgAggregate = {
  __typename?: 'EvaluationAvgAggregate';
  athleteId?: Maybe<Scalars['Float']['output']>;
  createdById?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  schoolId?: Maybe<Scalars['Float']['output']>;
};

export type EvaluationAvgOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdById?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
};

export type EvaluationCountAggregate = {
  __typename?: 'EvaluationCountAggregate';
  _all: Scalars['Int']['output'];
  athleteId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  createdById: Scalars['Int']['output'];
  evaluationType: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  images: Scalars['Int']['output'];
  note: Scalars['Int']['output'];
  schoolId: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  videos: Scalars['Int']['output'];
  videosAspectRatio: Scalars['Int']['output'];
};

export type EvaluationCountOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdById?: InputMaybe<SortOrder>;
  evaluationType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<SortOrder>;
  note?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  videos?: InputMaybe<SortOrder>;
  videosAspectRatio?: InputMaybe<SortOrder>;
};

export type EvaluationCreateInput = {
  athlete: AthleteProfileCreateNestedOneWithoutEvaluationsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdBy: UserCreateNestedOneWithoutEvaluationsCreatedInput;
  evaluationType?: InputMaybe<EvaluationType>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<EvaluationCreateimagesInput>;
  note: Scalars['String']['input'];
  school: SchoolCreateNestedOneWithoutEvaluationsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<EvaluationCreatevideosInput>;
  videosAspectRatio?: InputMaybe<EvaluationCreatevideosAspectRatioInput>;
};

export type EvaluationCreateManyAthleteInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdById: Scalars['BigInt']['input'];
  evaluationType?: InputMaybe<EvaluationType>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<EvaluationCreateimagesInput>;
  note: Scalars['String']['input'];
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<EvaluationCreatevideosInput>;
  videosAspectRatio?: InputMaybe<EvaluationCreatevideosAspectRatioInput>;
};

export type EvaluationCreateManyAthleteInputEnvelope = {
  data: Array<EvaluationCreateManyAthleteInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EvaluationCreateManyCreatedByInput = {
  athleteId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  evaluationType?: InputMaybe<EvaluationType>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<EvaluationCreateimagesInput>;
  note: Scalars['String']['input'];
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<EvaluationCreatevideosInput>;
  videosAspectRatio?: InputMaybe<EvaluationCreatevideosAspectRatioInput>;
};

export type EvaluationCreateManyCreatedByInputEnvelope = {
  data: Array<EvaluationCreateManyCreatedByInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EvaluationCreateManyInput = {
  athleteId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdById: Scalars['BigInt']['input'];
  evaluationType?: InputMaybe<EvaluationType>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<EvaluationCreateimagesInput>;
  note: Scalars['String']['input'];
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<EvaluationCreatevideosInput>;
  videosAspectRatio?: InputMaybe<EvaluationCreatevideosAspectRatioInput>;
};

export type EvaluationCreateManySchoolInput = {
  athleteId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdById: Scalars['BigInt']['input'];
  evaluationType?: InputMaybe<EvaluationType>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<EvaluationCreateimagesInput>;
  note: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<EvaluationCreatevideosInput>;
  videosAspectRatio?: InputMaybe<EvaluationCreatevideosAspectRatioInput>;
};

export type EvaluationCreateManySchoolInputEnvelope = {
  data: Array<EvaluationCreateManySchoolInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EvaluationCreateNestedManyWithoutAthleteInput = {
  connect?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EvaluationCreateOrConnectWithoutAthleteInput>>;
  create?: InputMaybe<Array<EvaluationCreateWithoutAthleteInput>>;
  createMany?: InputMaybe<EvaluationCreateManyAthleteInputEnvelope>;
};

export type EvaluationCreateNestedManyWithoutCreatedByInput = {
  connect?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EvaluationCreateOrConnectWithoutCreatedByInput>>;
  create?: InputMaybe<Array<EvaluationCreateWithoutCreatedByInput>>;
  createMany?: InputMaybe<EvaluationCreateManyCreatedByInputEnvelope>;
};

export type EvaluationCreateNestedManyWithoutSchoolInput = {
  connect?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EvaluationCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<EvaluationCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<EvaluationCreateManySchoolInputEnvelope>;
};

export type EvaluationCreateOrConnectWithoutAthleteInput = {
  create: EvaluationCreateWithoutAthleteInput;
  where: EvaluationWhereUniqueInput;
};

export type EvaluationCreateOrConnectWithoutCreatedByInput = {
  create: EvaluationCreateWithoutCreatedByInput;
  where: EvaluationWhereUniqueInput;
};

export type EvaluationCreateOrConnectWithoutSchoolInput = {
  create: EvaluationCreateWithoutSchoolInput;
  where: EvaluationWhereUniqueInput;
};

export type EvaluationCreateWithoutAthleteInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdBy: UserCreateNestedOneWithoutEvaluationsCreatedInput;
  evaluationType?: InputMaybe<EvaluationType>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<EvaluationCreateimagesInput>;
  note: Scalars['String']['input'];
  school: SchoolCreateNestedOneWithoutEvaluationsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<EvaluationCreatevideosInput>;
  videosAspectRatio?: InputMaybe<EvaluationCreatevideosAspectRatioInput>;
};

export type EvaluationCreateWithoutCreatedByInput = {
  athlete: AthleteProfileCreateNestedOneWithoutEvaluationsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  evaluationType?: InputMaybe<EvaluationType>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<EvaluationCreateimagesInput>;
  note: Scalars['String']['input'];
  school: SchoolCreateNestedOneWithoutEvaluationsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<EvaluationCreatevideosInput>;
  videosAspectRatio?: InputMaybe<EvaluationCreatevideosAspectRatioInput>;
};

export type EvaluationCreateWithoutSchoolInput = {
  athlete: AthleteProfileCreateNestedOneWithoutEvaluationsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdBy: UserCreateNestedOneWithoutEvaluationsCreatedInput;
  evaluationType?: InputMaybe<EvaluationType>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<EvaluationCreateimagesInput>;
  note: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<EvaluationCreatevideosInput>;
  videosAspectRatio?: InputMaybe<EvaluationCreatevideosAspectRatioInput>;
};

export type EvaluationCreateimagesInput = {
  set: Array<Scalars['String']['input']>;
};

export type EvaluationCreatevideosAspectRatioInput = {
  set: Array<Scalars['String']['input']>;
};

export type EvaluationCreatevideosInput = {
  set: Array<Scalars['String']['input']>;
};

export type EvaluationGroupBy = {
  __typename?: 'EvaluationGroupBy';
  _avg?: Maybe<EvaluationAvgAggregate>;
  _count?: Maybe<EvaluationCountAggregate>;
  _max?: Maybe<EvaluationMaxAggregate>;
  _min?: Maybe<EvaluationMinAggregate>;
  _sum?: Maybe<EvaluationSumAggregate>;
  athleteId: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['BigInt']['output'];
  evaluationType: EvaluationType;
  id: Scalars['BigInt']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  note: Scalars['String']['output'];
  schoolId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  videos?: Maybe<Array<Scalars['String']['output']>>;
  videosAspectRatio?: Maybe<Array<Scalars['String']['output']>>;
};

export type EvaluationListRelationFilter = {
  every?: InputMaybe<EvaluationWhereInput>;
  none?: InputMaybe<EvaluationWhereInput>;
  some?: InputMaybe<EvaluationWhereInput>;
};

export type EvaluationMaxAggregate = {
  __typename?: 'EvaluationMaxAggregate';
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdById?: Maybe<Scalars['BigInt']['output']>;
  evaluationType?: Maybe<EvaluationType>;
  id?: Maybe<Scalars['BigInt']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EvaluationMaxOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdById?: InputMaybe<SortOrder>;
  evaluationType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  note?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type EvaluationMinAggregate = {
  __typename?: 'EvaluationMinAggregate';
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdById?: Maybe<Scalars['BigInt']['output']>;
  evaluationType?: Maybe<EvaluationType>;
  id?: Maybe<Scalars['BigInt']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EvaluationMinOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdById?: InputMaybe<SortOrder>;
  evaluationType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  note?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type EvaluationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type EvaluationOrderByWithAggregationInput = {
  _avg?: InputMaybe<EvaluationAvgOrderByAggregateInput>;
  _count?: InputMaybe<EvaluationCountOrderByAggregateInput>;
  _max?: InputMaybe<EvaluationMaxOrderByAggregateInput>;
  _min?: InputMaybe<EvaluationMinOrderByAggregateInput>;
  _sum?: InputMaybe<EvaluationSumOrderByAggregateInput>;
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdById?: InputMaybe<SortOrder>;
  evaluationType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<SortOrder>;
  note?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  videos?: InputMaybe<SortOrder>;
  videosAspectRatio?: InputMaybe<SortOrder>;
};

export type EvaluationOrderByWithRelationInput = {
  athlete?: InputMaybe<AthleteProfileOrderByWithRelationInput>;
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  evaluationType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<SortOrder>;
  note?: InputMaybe<SortOrder>;
  school?: InputMaybe<SchoolOrderByWithRelationInput>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  videos?: InputMaybe<SortOrder>;
  videosAspectRatio?: InputMaybe<SortOrder>;
};

export enum EvaluationScalarFieldEnum {
  AthleteId = 'athleteId',
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  EvaluationType = 'evaluationType',
  Id = 'id',
  Images = 'images',
  Note = 'note',
  SchoolId = 'schoolId',
  UpdatedAt = 'updatedAt',
  Videos = 'videos',
  VideosAspectRatio = 'videosAspectRatio'
}

export type EvaluationScalarWhereInput = {
  AND?: InputMaybe<Array<EvaluationScalarWhereInput>>;
  NOT?: InputMaybe<Array<EvaluationScalarWhereInput>>;
  OR?: InputMaybe<Array<EvaluationScalarWhereInput>>;
  athleteId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<BigIntFilter>;
  evaluationType?: InputMaybe<EnumEvaluationTypeFilter>;
  id?: InputMaybe<BigIntFilter>;
  images?: InputMaybe<StringNullableListFilter>;
  note?: InputMaybe<StringFilter>;
  schoolId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  videos?: InputMaybe<StringNullableListFilter>;
  videosAspectRatio?: InputMaybe<StringNullableListFilter>;
};

export type EvaluationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<EvaluationScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<EvaluationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<EvaluationScalarWhereWithAggregatesInput>>;
  athleteId?: InputMaybe<BigIntWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  createdById?: InputMaybe<BigIntWithAggregatesFilter>;
  evaluationType?: InputMaybe<EnumEvaluationTypeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  images?: InputMaybe<StringNullableListFilter>;
  note?: InputMaybe<StringWithAggregatesFilter>;
  schoolId?: InputMaybe<BigIntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  videos?: InputMaybe<StringNullableListFilter>;
  videosAspectRatio?: InputMaybe<StringNullableListFilter>;
};

export type EvaluationSumAggregate = {
  __typename?: 'EvaluationSumAggregate';
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  createdById?: Maybe<Scalars['BigInt']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
};

export type EvaluationSumOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdById?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
};

export enum EvaluationType {
  Character = 'CHARACTER',
  Evaluation = 'EVALUATION',
  Strength = 'STRENGTH',
  Summary = 'SUMMARY',
  Weakness = 'WEAKNESS'
}

export type EvaluationUpdateInput = {
  athlete?: InputMaybe<AthleteProfileUpdateOneRequiredWithoutEvaluationsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutEvaluationsCreatedNestedInput>;
  evaluationType?: InputMaybe<EnumEvaluationTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  images?: InputMaybe<EvaluationUpdateimagesInput>;
  note?: InputMaybe<StringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutEvaluationsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  videos?: InputMaybe<EvaluationUpdatevideosInput>;
  videosAspectRatio?: InputMaybe<EvaluationUpdatevideosAspectRatioInput>;
};

export type EvaluationUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  evaluationType?: InputMaybe<EnumEvaluationTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  images?: InputMaybe<EvaluationUpdateimagesInput>;
  note?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  videos?: InputMaybe<EvaluationUpdatevideosInput>;
  videosAspectRatio?: InputMaybe<EvaluationUpdatevideosAspectRatioInput>;
};

export type EvaluationUpdateManyWithWhereWithoutAthleteInput = {
  data: EvaluationUpdateManyMutationInput;
  where: EvaluationScalarWhereInput;
};

export type EvaluationUpdateManyWithWhereWithoutCreatedByInput = {
  data: EvaluationUpdateManyMutationInput;
  where: EvaluationScalarWhereInput;
};

export type EvaluationUpdateManyWithWhereWithoutSchoolInput = {
  data: EvaluationUpdateManyMutationInput;
  where: EvaluationScalarWhereInput;
};

export type EvaluationUpdateManyWithoutAthleteNestedInput = {
  connect?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EvaluationCreateOrConnectWithoutAthleteInput>>;
  create?: InputMaybe<Array<EvaluationCreateWithoutAthleteInput>>;
  createMany?: InputMaybe<EvaluationCreateManyAthleteInputEnvelope>;
  delete?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EvaluationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  set?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  update?: InputMaybe<Array<EvaluationUpdateWithWhereUniqueWithoutAthleteInput>>;
  updateMany?: InputMaybe<Array<EvaluationUpdateManyWithWhereWithoutAthleteInput>>;
  upsert?: InputMaybe<Array<EvaluationUpsertWithWhereUniqueWithoutAthleteInput>>;
};

export type EvaluationUpdateManyWithoutCreatedByNestedInput = {
  connect?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EvaluationCreateOrConnectWithoutCreatedByInput>>;
  create?: InputMaybe<Array<EvaluationCreateWithoutCreatedByInput>>;
  createMany?: InputMaybe<EvaluationCreateManyCreatedByInputEnvelope>;
  delete?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EvaluationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  set?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  update?: InputMaybe<Array<EvaluationUpdateWithWhereUniqueWithoutCreatedByInput>>;
  updateMany?: InputMaybe<Array<EvaluationUpdateManyWithWhereWithoutCreatedByInput>>;
  upsert?: InputMaybe<Array<EvaluationUpsertWithWhereUniqueWithoutCreatedByInput>>;
};

export type EvaluationUpdateManyWithoutSchoolNestedInput = {
  connect?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EvaluationCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<EvaluationCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<EvaluationCreateManySchoolInputEnvelope>;
  delete?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EvaluationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  set?: InputMaybe<Array<EvaluationWhereUniqueInput>>;
  update?: InputMaybe<Array<EvaluationUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: InputMaybe<Array<EvaluationUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: InputMaybe<Array<EvaluationUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type EvaluationUpdateWithWhereUniqueWithoutAthleteInput = {
  data: EvaluationUpdateWithoutAthleteInput;
  where: EvaluationWhereUniqueInput;
};

export type EvaluationUpdateWithWhereUniqueWithoutCreatedByInput = {
  data: EvaluationUpdateWithoutCreatedByInput;
  where: EvaluationWhereUniqueInput;
};

export type EvaluationUpdateWithWhereUniqueWithoutSchoolInput = {
  data: EvaluationUpdateWithoutSchoolInput;
  where: EvaluationWhereUniqueInput;
};

export type EvaluationUpdateWithoutAthleteInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutEvaluationsCreatedNestedInput>;
  evaluationType?: InputMaybe<EnumEvaluationTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  images?: InputMaybe<EvaluationUpdateimagesInput>;
  note?: InputMaybe<StringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutEvaluationsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  videos?: InputMaybe<EvaluationUpdatevideosInput>;
  videosAspectRatio?: InputMaybe<EvaluationUpdatevideosAspectRatioInput>;
};

export type EvaluationUpdateWithoutCreatedByInput = {
  athlete?: InputMaybe<AthleteProfileUpdateOneRequiredWithoutEvaluationsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  evaluationType?: InputMaybe<EnumEvaluationTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  images?: InputMaybe<EvaluationUpdateimagesInput>;
  note?: InputMaybe<StringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutEvaluationsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  videos?: InputMaybe<EvaluationUpdatevideosInput>;
  videosAspectRatio?: InputMaybe<EvaluationUpdatevideosAspectRatioInput>;
};

export type EvaluationUpdateWithoutSchoolInput = {
  athlete?: InputMaybe<AthleteProfileUpdateOneRequiredWithoutEvaluationsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutEvaluationsCreatedNestedInput>;
  evaluationType?: InputMaybe<EnumEvaluationTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  images?: InputMaybe<EvaluationUpdateimagesInput>;
  note?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  videos?: InputMaybe<EvaluationUpdatevideosInput>;
  videosAspectRatio?: InputMaybe<EvaluationUpdatevideosAspectRatioInput>;
};

export type EvaluationUpdateimagesInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type EvaluationUpdatevideosAspectRatioInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type EvaluationUpdatevideosInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type EvaluationUpsertWithWhereUniqueWithoutAthleteInput = {
  create: EvaluationCreateWithoutAthleteInput;
  update: EvaluationUpdateWithoutAthleteInput;
  where: EvaluationWhereUniqueInput;
};

export type EvaluationUpsertWithWhereUniqueWithoutCreatedByInput = {
  create: EvaluationCreateWithoutCreatedByInput;
  update: EvaluationUpdateWithoutCreatedByInput;
  where: EvaluationWhereUniqueInput;
};

export type EvaluationUpsertWithWhereUniqueWithoutSchoolInput = {
  create: EvaluationCreateWithoutSchoolInput;
  update: EvaluationUpdateWithoutSchoolInput;
  where: EvaluationWhereUniqueInput;
};

export type EvaluationWhereInput = {
  AND?: InputMaybe<Array<EvaluationWhereInput>>;
  NOT?: InputMaybe<Array<EvaluationWhereInput>>;
  OR?: InputMaybe<Array<EvaluationWhereInput>>;
  athlete?: InputMaybe<AthleteProfileRelationFilter>;
  athleteId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserRelationFilter>;
  createdById?: InputMaybe<BigIntFilter>;
  evaluationType?: InputMaybe<EnumEvaluationTypeFilter>;
  id?: InputMaybe<BigIntFilter>;
  images?: InputMaybe<StringNullableListFilter>;
  note?: InputMaybe<StringFilter>;
  school?: InputMaybe<SchoolRelationFilter>;
  schoolId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  videos?: InputMaybe<StringNullableListFilter>;
  videosAspectRatio?: InputMaybe<StringNullableListFilter>;
};

export type EvaluationWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type FloatNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedFloatNullableFilter>;
  _min?: InputMaybe<NestedFloatNullableFilter>;
  _sum?: InputMaybe<NestedFloatNullableFilter>;
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type Follows = {
  __typename?: 'Follows';
  createdAt: Scalars['DateTime']['output'];
  follower: User;
  followerId: Scalars['BigInt']['output'];
  following: User;
  followingId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FollowsAvgAggregate = {
  __typename?: 'FollowsAvgAggregate';
  followerId?: Maybe<Scalars['Float']['output']>;
  followingId?: Maybe<Scalars['Float']['output']>;
};

export type FollowsAvgOrderByAggregateInput = {
  followerId?: InputMaybe<SortOrder>;
  followingId?: InputMaybe<SortOrder>;
};

export type FollowsCountAggregate = {
  __typename?: 'FollowsCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  followerId: Scalars['Int']['output'];
  followingId: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type FollowsCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  followerId?: InputMaybe<SortOrder>;
  followingId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FollowsCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  follower: UserCreateNestedOneWithoutFollowingInput;
  following: UserCreateNestedOneWithoutFollowedByInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FollowsCreateManyFollowerInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  followingId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FollowsCreateManyFollowerInputEnvelope = {
  data: Array<FollowsCreateManyFollowerInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FollowsCreateManyFollowingInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  followerId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FollowsCreateManyFollowingInputEnvelope = {
  data: Array<FollowsCreateManyFollowingInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FollowsCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  followerId: Scalars['BigInt']['input'];
  followingId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FollowsCreateNestedManyWithoutFollowerInput = {
  connect?: InputMaybe<Array<FollowsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FollowsCreateOrConnectWithoutFollowerInput>>;
  create?: InputMaybe<Array<FollowsCreateWithoutFollowerInput>>;
  createMany?: InputMaybe<FollowsCreateManyFollowerInputEnvelope>;
};

export type FollowsCreateNestedManyWithoutFollowingInput = {
  connect?: InputMaybe<Array<FollowsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FollowsCreateOrConnectWithoutFollowingInput>>;
  create?: InputMaybe<Array<FollowsCreateWithoutFollowingInput>>;
  createMany?: InputMaybe<FollowsCreateManyFollowingInputEnvelope>;
};

export type FollowsCreateOrConnectWithoutFollowerInput = {
  create: FollowsCreateWithoutFollowerInput;
  where: FollowsWhereUniqueInput;
};

export type FollowsCreateOrConnectWithoutFollowingInput = {
  create: FollowsCreateWithoutFollowingInput;
  where: FollowsWhereUniqueInput;
};

export type FollowsCreateWithoutFollowerInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  following: UserCreateNestedOneWithoutFollowedByInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FollowsCreateWithoutFollowingInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  follower: UserCreateNestedOneWithoutFollowingInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FollowsFollowerIdFollowingIdCompoundUniqueInput = {
  followerId: Scalars['BigInt']['input'];
  followingId: Scalars['BigInt']['input'];
};

export type FollowsGroupBy = {
  __typename?: 'FollowsGroupBy';
  _avg?: Maybe<FollowsAvgAggregate>;
  _count?: Maybe<FollowsCountAggregate>;
  _max?: Maybe<FollowsMaxAggregate>;
  _min?: Maybe<FollowsMinAggregate>;
  _sum?: Maybe<FollowsSumAggregate>;
  createdAt: Scalars['DateTime']['output'];
  followerId: Scalars['BigInt']['output'];
  followingId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FollowsListRelationFilter = {
  every?: InputMaybe<FollowsWhereInput>;
  none?: InputMaybe<FollowsWhereInput>;
  some?: InputMaybe<FollowsWhereInput>;
};

export type FollowsMaxAggregate = {
  __typename?: 'FollowsMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  followerId?: Maybe<Scalars['BigInt']['output']>;
  followingId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FollowsMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  followerId?: InputMaybe<SortOrder>;
  followingId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FollowsMinAggregate = {
  __typename?: 'FollowsMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  followerId?: Maybe<Scalars['BigInt']['output']>;
  followingId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FollowsMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  followerId?: InputMaybe<SortOrder>;
  followingId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FollowsOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FollowsOrderByWithAggregationInput = {
  _avg?: InputMaybe<FollowsAvgOrderByAggregateInput>;
  _count?: InputMaybe<FollowsCountOrderByAggregateInput>;
  _max?: InputMaybe<FollowsMaxOrderByAggregateInput>;
  _min?: InputMaybe<FollowsMinOrderByAggregateInput>;
  _sum?: InputMaybe<FollowsSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  followerId?: InputMaybe<SortOrder>;
  followingId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FollowsOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  follower?: InputMaybe<UserOrderByWithRelationInput>;
  followerId?: InputMaybe<SortOrder>;
  following?: InputMaybe<UserOrderByWithRelationInput>;
  followingId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum FollowsScalarFieldEnum {
  CreatedAt = 'createdAt',
  FollowerId = 'followerId',
  FollowingId = 'followingId',
  UpdatedAt = 'updatedAt'
}

export type FollowsScalarWhereInput = {
  AND?: InputMaybe<Array<FollowsScalarWhereInput>>;
  NOT?: InputMaybe<Array<FollowsScalarWhereInput>>;
  OR?: InputMaybe<Array<FollowsScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  followerId?: InputMaybe<BigIntFilter>;
  followingId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FollowsScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<FollowsScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<FollowsScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<FollowsScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  followerId?: InputMaybe<BigIntWithAggregatesFilter>;
  followingId?: InputMaybe<BigIntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type FollowsSumAggregate = {
  __typename?: 'FollowsSumAggregate';
  followerId?: Maybe<Scalars['BigInt']['output']>;
  followingId?: Maybe<Scalars['BigInt']['output']>;
};

export type FollowsSumOrderByAggregateInput = {
  followerId?: InputMaybe<SortOrder>;
  followingId?: InputMaybe<SortOrder>;
};

export type FollowsUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  follower?: InputMaybe<UserUpdateOneRequiredWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateOneRequiredWithoutFollowedByNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type FollowsUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type FollowsUpdateManyWithWhereWithoutFollowerInput = {
  data: FollowsUpdateManyMutationInput;
  where: FollowsScalarWhereInput;
};

export type FollowsUpdateManyWithWhereWithoutFollowingInput = {
  data: FollowsUpdateManyMutationInput;
  where: FollowsScalarWhereInput;
};

export type FollowsUpdateManyWithoutFollowerNestedInput = {
  connect?: InputMaybe<Array<FollowsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FollowsCreateOrConnectWithoutFollowerInput>>;
  create?: InputMaybe<Array<FollowsCreateWithoutFollowerInput>>;
  createMany?: InputMaybe<FollowsCreateManyFollowerInputEnvelope>;
  delete?: InputMaybe<Array<FollowsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<FollowsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<FollowsWhereUniqueInput>>;
  set?: InputMaybe<Array<FollowsWhereUniqueInput>>;
  update?: InputMaybe<Array<FollowsUpdateWithWhereUniqueWithoutFollowerInput>>;
  updateMany?: InputMaybe<Array<FollowsUpdateManyWithWhereWithoutFollowerInput>>;
  upsert?: InputMaybe<Array<FollowsUpsertWithWhereUniqueWithoutFollowerInput>>;
};

export type FollowsUpdateManyWithoutFollowingNestedInput = {
  connect?: InputMaybe<Array<FollowsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FollowsCreateOrConnectWithoutFollowingInput>>;
  create?: InputMaybe<Array<FollowsCreateWithoutFollowingInput>>;
  createMany?: InputMaybe<FollowsCreateManyFollowingInputEnvelope>;
  delete?: InputMaybe<Array<FollowsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<FollowsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<FollowsWhereUniqueInput>>;
  set?: InputMaybe<Array<FollowsWhereUniqueInput>>;
  update?: InputMaybe<Array<FollowsUpdateWithWhereUniqueWithoutFollowingInput>>;
  updateMany?: InputMaybe<Array<FollowsUpdateManyWithWhereWithoutFollowingInput>>;
  upsert?: InputMaybe<Array<FollowsUpsertWithWhereUniqueWithoutFollowingInput>>;
};

export type FollowsUpdateWithWhereUniqueWithoutFollowerInput = {
  data: FollowsUpdateWithoutFollowerInput;
  where: FollowsWhereUniqueInput;
};

export type FollowsUpdateWithWhereUniqueWithoutFollowingInput = {
  data: FollowsUpdateWithoutFollowingInput;
  where: FollowsWhereUniqueInput;
};

export type FollowsUpdateWithoutFollowerInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  following?: InputMaybe<UserUpdateOneRequiredWithoutFollowedByNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type FollowsUpdateWithoutFollowingInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  follower?: InputMaybe<UserUpdateOneRequiredWithoutFollowingNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type FollowsUpsertWithWhereUniqueWithoutFollowerInput = {
  create: FollowsCreateWithoutFollowerInput;
  update: FollowsUpdateWithoutFollowerInput;
  where: FollowsWhereUniqueInput;
};

export type FollowsUpsertWithWhereUniqueWithoutFollowingInput = {
  create: FollowsCreateWithoutFollowingInput;
  update: FollowsUpdateWithoutFollowingInput;
  where: FollowsWhereUniqueInput;
};

export type FollowsWhereInput = {
  AND?: InputMaybe<Array<FollowsWhereInput>>;
  NOT?: InputMaybe<Array<FollowsWhereInput>>;
  OR?: InputMaybe<Array<FollowsWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  follower?: InputMaybe<UserRelationFilter>;
  followerId?: InputMaybe<BigIntFilter>;
  following?: InputMaybe<UserRelationFilter>;
  followingId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FollowsWhereUniqueInput = {
  followerId_followingId?: InputMaybe<FollowsFollowerIdFollowingIdCompoundUniqueInput>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedIntNullableFilter>;
  _sum?: InputMaybe<NestedIntNullableFilter>;
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type InterestedSchools = {
  __typename?: 'InterestedSchools';
  AthleteCommitment: Scalars['Int']['output'];
  User?: Maybe<User>;
  athlete: AthleteProfile;
  athleteId: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  school: School;
  schoolId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type InterestedSchoolsAthleteIdSchoolIdCompoundUniqueInput = {
  athleteId: Scalars['BigInt']['input'];
  schoolId: Scalars['BigInt']['input'];
};

export type InterestedSchoolsAvgAggregate = {
  __typename?: 'InterestedSchoolsAvgAggregate';
  AthleteCommitment?: Maybe<Scalars['Float']['output']>;
  athleteId?: Maybe<Scalars['Float']['output']>;
  schoolId?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type InterestedSchoolsAvgOrderByAggregateInput = {
  AthleteCommitment?: InputMaybe<SortOrder>;
  athleteId?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type InterestedSchoolsCountAggregate = {
  __typename?: 'InterestedSchoolsCountAggregate';
  AthleteCommitment: Scalars['Int']['output'];
  _all: Scalars['Int']['output'];
  athleteId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  schoolId: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type InterestedSchoolsCountOrderByAggregateInput = {
  AthleteCommitment?: InputMaybe<SortOrder>;
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type InterestedSchoolsCreateInput = {
  AthleteCommitment?: InputMaybe<Scalars['Int']['input']>;
  User?: InputMaybe<UserCreateNestedOneWithoutInterestedSchoolsInput>;
  athlete: AthleteProfileCreateNestedOneWithoutInterestedSchoolsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInterestedInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InterestedSchoolsCreateManyAthleteInput = {
  AthleteCommitment?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type InterestedSchoolsCreateManyAthleteInputEnvelope = {
  data: Array<InterestedSchoolsCreateManyAthleteInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InterestedSchoolsCreateManyInput = {
  AthleteCommitment?: InputMaybe<Scalars['Int']['input']>;
  athleteId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type InterestedSchoolsCreateManySchoolInput = {
  AthleteCommitment?: InputMaybe<Scalars['Int']['input']>;
  athleteId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type InterestedSchoolsCreateManySchoolInputEnvelope = {
  data: Array<InterestedSchoolsCreateManySchoolInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InterestedSchoolsCreateManyUserInput = {
  AthleteCommitment?: InputMaybe<Scalars['Int']['input']>;
  athleteId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InterestedSchoolsCreateManyUserInputEnvelope = {
  data: Array<InterestedSchoolsCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InterestedSchoolsCreateNestedManyWithoutAthleteInput = {
  connect?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<InterestedSchoolsCreateOrConnectWithoutAthleteInput>>;
  create?: InputMaybe<Array<InterestedSchoolsCreateWithoutAthleteInput>>;
  createMany?: InputMaybe<InterestedSchoolsCreateManyAthleteInputEnvelope>;
};

export type InterestedSchoolsCreateNestedManyWithoutSchoolInput = {
  connect?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<InterestedSchoolsCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<InterestedSchoolsCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<InterestedSchoolsCreateManySchoolInputEnvelope>;
};

export type InterestedSchoolsCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<InterestedSchoolsCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<InterestedSchoolsCreateWithoutUserInput>>;
  createMany?: InputMaybe<InterestedSchoolsCreateManyUserInputEnvelope>;
};

export type InterestedSchoolsCreateOrConnectWithoutAthleteInput = {
  create: InterestedSchoolsCreateWithoutAthleteInput;
  where: InterestedSchoolsWhereUniqueInput;
};

export type InterestedSchoolsCreateOrConnectWithoutSchoolInput = {
  create: InterestedSchoolsCreateWithoutSchoolInput;
  where: InterestedSchoolsWhereUniqueInput;
};

export type InterestedSchoolsCreateOrConnectWithoutUserInput = {
  create: InterestedSchoolsCreateWithoutUserInput;
  where: InterestedSchoolsWhereUniqueInput;
};

export type InterestedSchoolsCreateWithoutAthleteInput = {
  AthleteCommitment?: InputMaybe<Scalars['Int']['input']>;
  User?: InputMaybe<UserCreateNestedOneWithoutInterestedSchoolsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInterestedInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InterestedSchoolsCreateWithoutSchoolInput = {
  AthleteCommitment?: InputMaybe<Scalars['Int']['input']>;
  User?: InputMaybe<UserCreateNestedOneWithoutInterestedSchoolsInput>;
  athlete: AthleteProfileCreateNestedOneWithoutInterestedSchoolsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InterestedSchoolsCreateWithoutUserInput = {
  AthleteCommitment?: InputMaybe<Scalars['Int']['input']>;
  athlete: AthleteProfileCreateNestedOneWithoutInterestedSchoolsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesInterestedInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InterestedSchoolsGroupBy = {
  __typename?: 'InterestedSchoolsGroupBy';
  AthleteCommitment: Scalars['Int']['output'];
  _avg?: Maybe<InterestedSchoolsAvgAggregate>;
  _count?: Maybe<InterestedSchoolsCountAggregate>;
  _max?: Maybe<InterestedSchoolsMaxAggregate>;
  _min?: Maybe<InterestedSchoolsMinAggregate>;
  _sum?: Maybe<InterestedSchoolsSumAggregate>;
  athleteId: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  schoolId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type InterestedSchoolsListRelationFilter = {
  every?: InputMaybe<InterestedSchoolsWhereInput>;
  none?: InputMaybe<InterestedSchoolsWhereInput>;
  some?: InputMaybe<InterestedSchoolsWhereInput>;
};

export type InterestedSchoolsMaxAggregate = {
  __typename?: 'InterestedSchoolsMaxAggregate';
  AthleteCommitment?: Maybe<Scalars['Int']['output']>;
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type InterestedSchoolsMaxOrderByAggregateInput = {
  AthleteCommitment?: InputMaybe<SortOrder>;
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type InterestedSchoolsMinAggregate = {
  __typename?: 'InterestedSchoolsMinAggregate';
  AthleteCommitment?: Maybe<Scalars['Int']['output']>;
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type InterestedSchoolsMinOrderByAggregateInput = {
  AthleteCommitment?: InputMaybe<SortOrder>;
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type InterestedSchoolsOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type InterestedSchoolsOrderByWithAggregationInput = {
  AthleteCommitment?: InputMaybe<SortOrder>;
  _avg?: InputMaybe<InterestedSchoolsAvgOrderByAggregateInput>;
  _count?: InputMaybe<InterestedSchoolsCountOrderByAggregateInput>;
  _max?: InputMaybe<InterestedSchoolsMaxOrderByAggregateInput>;
  _min?: InputMaybe<InterestedSchoolsMinOrderByAggregateInput>;
  _sum?: InputMaybe<InterestedSchoolsSumOrderByAggregateInput>;
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type InterestedSchoolsOrderByWithRelationInput = {
  AthleteCommitment?: InputMaybe<SortOrder>;
  User?: InputMaybe<UserOrderByWithRelationInput>;
  athlete?: InputMaybe<AthleteProfileOrderByWithRelationInput>;
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  school?: InputMaybe<SchoolOrderByWithRelationInput>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export enum InterestedSchoolsScalarFieldEnum {
  AthleteCommitment = 'AthleteCommitment',
  AthleteId = 'athleteId',
  CreatedAt = 'createdAt',
  SchoolId = 'schoolId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type InterestedSchoolsScalarWhereInput = {
  AND?: InputMaybe<Array<InterestedSchoolsScalarWhereInput>>;
  AthleteCommitment?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<InterestedSchoolsScalarWhereInput>>;
  OR?: InputMaybe<Array<InterestedSchoolsScalarWhereInput>>;
  athleteId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  schoolId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntNullableFilter>;
};

export type InterestedSchoolsScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<InterestedSchoolsScalarWhereWithAggregatesInput>>;
  AthleteCommitment?: InputMaybe<IntWithAggregatesFilter>;
  NOT?: InputMaybe<Array<InterestedSchoolsScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<InterestedSchoolsScalarWhereWithAggregatesInput>>;
  athleteId?: InputMaybe<BigIntWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  schoolId?: InputMaybe<BigIntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<BigIntNullableWithAggregatesFilter>;
};

export type InterestedSchoolsSumAggregate = {
  __typename?: 'InterestedSchoolsSumAggregate';
  AthleteCommitment?: Maybe<Scalars['Int']['output']>;
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type InterestedSchoolsSumOrderByAggregateInput = {
  AthleteCommitment?: InputMaybe<SortOrder>;
  athleteId?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type InterestedSchoolsUpdateInput = {
  AthleteCommitment?: InputMaybe<IntFieldUpdateOperationsInput>;
  User?: InputMaybe<UserUpdateOneWithoutInterestedSchoolsNestedInput>;
  athlete?: InputMaybe<AthleteProfileUpdateOneRequiredWithoutInterestedSchoolsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesInterestedNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type InterestedSchoolsUpdateManyMutationInput = {
  AthleteCommitment?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type InterestedSchoolsUpdateManyWithWhereWithoutAthleteInput = {
  data: InterestedSchoolsUpdateManyMutationInput;
  where: InterestedSchoolsScalarWhereInput;
};

export type InterestedSchoolsUpdateManyWithWhereWithoutSchoolInput = {
  data: InterestedSchoolsUpdateManyMutationInput;
  where: InterestedSchoolsScalarWhereInput;
};

export type InterestedSchoolsUpdateManyWithWhereWithoutUserInput = {
  data: InterestedSchoolsUpdateManyMutationInput;
  where: InterestedSchoolsScalarWhereInput;
};

export type InterestedSchoolsUpdateManyWithoutAthleteNestedInput = {
  connect?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<InterestedSchoolsCreateOrConnectWithoutAthleteInput>>;
  create?: InputMaybe<Array<InterestedSchoolsCreateWithoutAthleteInput>>;
  createMany?: InputMaybe<InterestedSchoolsCreateManyAthleteInputEnvelope>;
  delete?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<InterestedSchoolsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  set?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  update?: InputMaybe<Array<InterestedSchoolsUpdateWithWhereUniqueWithoutAthleteInput>>;
  updateMany?: InputMaybe<Array<InterestedSchoolsUpdateManyWithWhereWithoutAthleteInput>>;
  upsert?: InputMaybe<Array<InterestedSchoolsUpsertWithWhereUniqueWithoutAthleteInput>>;
};

export type InterestedSchoolsUpdateManyWithoutSchoolNestedInput = {
  connect?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<InterestedSchoolsCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<InterestedSchoolsCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<InterestedSchoolsCreateManySchoolInputEnvelope>;
  delete?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<InterestedSchoolsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  set?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  update?: InputMaybe<Array<InterestedSchoolsUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: InputMaybe<Array<InterestedSchoolsUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: InputMaybe<Array<InterestedSchoolsUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type InterestedSchoolsUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<InterestedSchoolsCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<InterestedSchoolsCreateWithoutUserInput>>;
  createMany?: InputMaybe<InterestedSchoolsCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<InterestedSchoolsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  set?: InputMaybe<Array<InterestedSchoolsWhereUniqueInput>>;
  update?: InputMaybe<Array<InterestedSchoolsUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<InterestedSchoolsUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<InterestedSchoolsUpsertWithWhereUniqueWithoutUserInput>>;
};

export type InterestedSchoolsUpdateWithWhereUniqueWithoutAthleteInput = {
  data: InterestedSchoolsUpdateWithoutAthleteInput;
  where: InterestedSchoolsWhereUniqueInput;
};

export type InterestedSchoolsUpdateWithWhereUniqueWithoutSchoolInput = {
  data: InterestedSchoolsUpdateWithoutSchoolInput;
  where: InterestedSchoolsWhereUniqueInput;
};

export type InterestedSchoolsUpdateWithWhereUniqueWithoutUserInput = {
  data: InterestedSchoolsUpdateWithoutUserInput;
  where: InterestedSchoolsWhereUniqueInput;
};

export type InterestedSchoolsUpdateWithoutAthleteInput = {
  AthleteCommitment?: InputMaybe<IntFieldUpdateOperationsInput>;
  User?: InputMaybe<UserUpdateOneWithoutInterestedSchoolsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesInterestedNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type InterestedSchoolsUpdateWithoutSchoolInput = {
  AthleteCommitment?: InputMaybe<IntFieldUpdateOperationsInput>;
  User?: InputMaybe<UserUpdateOneWithoutInterestedSchoolsNestedInput>;
  athlete?: InputMaybe<AthleteProfileUpdateOneRequiredWithoutInterestedSchoolsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type InterestedSchoolsUpdateWithoutUserInput = {
  AthleteCommitment?: InputMaybe<IntFieldUpdateOperationsInput>;
  athlete?: InputMaybe<AthleteProfileUpdateOneRequiredWithoutInterestedSchoolsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesInterestedNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type InterestedSchoolsUpsertWithWhereUniqueWithoutAthleteInput = {
  create: InterestedSchoolsCreateWithoutAthleteInput;
  update: InterestedSchoolsUpdateWithoutAthleteInput;
  where: InterestedSchoolsWhereUniqueInput;
};

export type InterestedSchoolsUpsertWithWhereUniqueWithoutSchoolInput = {
  create: InterestedSchoolsCreateWithoutSchoolInput;
  update: InterestedSchoolsUpdateWithoutSchoolInput;
  where: InterestedSchoolsWhereUniqueInput;
};

export type InterestedSchoolsUpsertWithWhereUniqueWithoutUserInput = {
  create: InterestedSchoolsCreateWithoutUserInput;
  update: InterestedSchoolsUpdateWithoutUserInput;
  where: InterestedSchoolsWhereUniqueInput;
};

export type InterestedSchoolsWhereInput = {
  AND?: InputMaybe<Array<InterestedSchoolsWhereInput>>;
  AthleteCommitment?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<InterestedSchoolsWhereInput>>;
  OR?: InputMaybe<Array<InterestedSchoolsWhereInput>>;
  User?: InputMaybe<UserRelationFilter>;
  athlete?: InputMaybe<AthleteProfileRelationFilter>;
  athleteId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  school?: InputMaybe<SchoolRelationFilter>;
  schoolId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntNullableFilter>;
};

export type InterestedSchoolsWhereUniqueInput = {
  athleteId_schoolId?: InputMaybe<InterestedSchoolsAthleteIdSchoolIdCompoundUniqueInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyAccountType: AffectedRowsOutput;
  createManyAthleteProfile: AffectedRowsOutput;
  createManyBlocks: AffectedRowsOutput;
  createManyCoachProfile: AffectedRowsOutput;
  createManyComment: AffectedRowsOutput;
  createManyCommentLike: AffectedRowsOutput;
  createManyCountry: AffectedRowsOutput;
  createManyEvaluation: AffectedRowsOutput;
  createManyFollows: AffectedRowsOutput;
  createManyInterestedSchools: AffectedRowsOutput;
  createManyPosition: AffectedRowsOutput;
  createManyPositionCategory: AffectedRowsOutput;
  createManyPost: AffectedRowsOutput;
  createManyPostFlag: AffectedRowsOutput;
  createManyPostLike: AffectedRowsOutput;
  createManyProspectedAthlete: AffectedRowsOutput;
  createManyRecruitedAthlete: AffectedRowsOutput;
  createManyRole: AffectedRowsOutput;
  createManySchool: AffectedRowsOutput;
  createManySchoolType: AffectedRowsOutput;
  createManySkillType: AffectedRowsOutput;
  createManySkills: AffectedRowsOutput;
  createManyTranscripts: AffectedRowsOutput;
  createManyUser: AffectedRowsOutput;
  createOneAccountType: AccountType;
  createOneAthleteProfile: AthleteProfile;
  createOneBlocks: Blocks;
  createOneCoachProfile: CoachProfile;
  createOneComment: Comment;
  createOneCommentLike: CommentLike;
  createOneCountry: Country;
  createOneEvaluation: Evaluation;
  createOneFollows: Follows;
  createOneInterestedSchools: InterestedSchools;
  createOnePosition: Position;
  createOnePositionCategory: PositionCategory;
  createOnePost: Post;
  createOnePostFlag: PostFlag;
  createOnePostLike: PostLike;
  createOneProspectedAthlete: ProspectedAthlete;
  createOneRecruitedAthlete: RecruitedAthlete;
  createOneRole: Role;
  createOneSchool: School;
  createOneSchoolType: SchoolType;
  createOneSkillType: SkillType;
  createOneSkills: Skills;
  createOneTranscripts: Transcripts;
  createOneUser: User;
  deleteManyAccountType: AffectedRowsOutput;
  deleteManyAthleteProfile: AffectedRowsOutput;
  deleteManyBlocks: AffectedRowsOutput;
  deleteManyCoachProfile: AffectedRowsOutput;
  deleteManyComment: AffectedRowsOutput;
  deleteManyCommentLike: AffectedRowsOutput;
  deleteManyCountry: AffectedRowsOutput;
  deleteManyEvaluation: AffectedRowsOutput;
  deleteManyFollows: AffectedRowsOutput;
  deleteManyInterestedSchools: AffectedRowsOutput;
  deleteManyPosition: AffectedRowsOutput;
  deleteManyPositionCategory: AffectedRowsOutput;
  deleteManyPost: AffectedRowsOutput;
  deleteManyPostFlag: AffectedRowsOutput;
  deleteManyPostLike: AffectedRowsOutput;
  deleteManyProspectedAthlete: AffectedRowsOutput;
  deleteManyRecruitedAthlete: AffectedRowsOutput;
  deleteManyRole: AffectedRowsOutput;
  deleteManySchool: AffectedRowsOutput;
  deleteManySchoolType: AffectedRowsOutput;
  deleteManySkillType: AffectedRowsOutput;
  deleteManySkills: AffectedRowsOutput;
  deleteManyTranscripts: AffectedRowsOutput;
  deleteManyUser: AffectedRowsOutput;
  deleteOneAccountType?: Maybe<AccountType>;
  deleteOneAthleteProfile?: Maybe<AthleteProfile>;
  deleteOneBlocks?: Maybe<Blocks>;
  deleteOneCoachProfile?: Maybe<CoachProfile>;
  deleteOneComment?: Maybe<Comment>;
  deleteOneCommentLike?: Maybe<CommentLike>;
  deleteOneCountry?: Maybe<Country>;
  deleteOneEvaluation?: Maybe<Evaluation>;
  deleteOneFollows?: Maybe<Follows>;
  deleteOneInterestedSchools?: Maybe<InterestedSchools>;
  deleteOnePosition?: Maybe<Position>;
  deleteOnePositionCategory?: Maybe<PositionCategory>;
  deleteOnePost?: Maybe<Post>;
  deleteOnePostFlag?: Maybe<PostFlag>;
  deleteOnePostLike?: Maybe<PostLike>;
  deleteOneProspectedAthlete?: Maybe<ProspectedAthlete>;
  deleteOneRecruitedAthlete?: Maybe<RecruitedAthlete>;
  deleteOneRole?: Maybe<Role>;
  deleteOneSchool?: Maybe<School>;
  deleteOneSchoolType?: Maybe<SchoolType>;
  deleteOneSkillType?: Maybe<SkillType>;
  deleteOneSkills?: Maybe<Skills>;
  deleteOneTranscripts?: Maybe<Transcripts>;
  deleteOneUser?: Maybe<User>;
  processVideo?: Maybe<Return>;
  registerCoach: RegisterCoachReturn;
  sendPushNotificationToUser?: Maybe<SendPushNotificationToUserReturn>;
  updateManyAccountType: AffectedRowsOutput;
  updateManyAthleteProfile: AffectedRowsOutput;
  updateManyBlocks: AffectedRowsOutput;
  updateManyCoachProfile: AffectedRowsOutput;
  updateManyComment: AffectedRowsOutput;
  updateManyCommentLike: AffectedRowsOutput;
  updateManyCountry: AffectedRowsOutput;
  updateManyEvaluation: AffectedRowsOutput;
  updateManyFollows: AffectedRowsOutput;
  updateManyInterestedSchools: AffectedRowsOutput;
  updateManyPosition: AffectedRowsOutput;
  updateManyPositionCategory: AffectedRowsOutput;
  updateManyPost: AffectedRowsOutput;
  updateManyPostFlag: AffectedRowsOutput;
  updateManyPostLike: AffectedRowsOutput;
  updateManyProspectedAthlete: AffectedRowsOutput;
  updateManyRecruitedAthlete: AffectedRowsOutput;
  updateManyRole: AffectedRowsOutput;
  updateManySchool: AffectedRowsOutput;
  updateManySchoolType: AffectedRowsOutput;
  updateManySkillType: AffectedRowsOutput;
  updateManySkills: AffectedRowsOutput;
  updateManyTranscripts: AffectedRowsOutput;
  updateManyUser: AffectedRowsOutput;
  updateOneAccountType?: Maybe<AccountType>;
  updateOneAthleteProfile?: Maybe<AthleteProfile>;
  updateOneBlocks?: Maybe<Blocks>;
  updateOneCoachProfile?: Maybe<CoachProfile>;
  updateOneComment?: Maybe<Comment>;
  updateOneCommentLike?: Maybe<CommentLike>;
  updateOneCountry?: Maybe<Country>;
  updateOneEvaluation?: Maybe<Evaluation>;
  updateOneFollows?: Maybe<Follows>;
  updateOneInterestedSchools?: Maybe<InterestedSchools>;
  updateOnePosition?: Maybe<Position>;
  updateOnePositionCategory?: Maybe<PositionCategory>;
  updateOnePost?: Maybe<Post>;
  updateOnePostFlag?: Maybe<PostFlag>;
  updateOnePostLike?: Maybe<PostLike>;
  updateOneProspectedAthlete?: Maybe<ProspectedAthlete>;
  updateOneRecruitedAthlete?: Maybe<RecruitedAthlete>;
  updateOneRole?: Maybe<Role>;
  updateOneSchool?: Maybe<School>;
  updateOneSchoolType?: Maybe<SchoolType>;
  updateOneSkillType?: Maybe<SkillType>;
  updateOneSkills?: Maybe<Skills>;
  updateOneTranscripts?: Maybe<Transcripts>;
  updateOneUser?: Maybe<User>;
  updateUserFcmToken?: Maybe<UpdateUserFcmTokenReturn>;
  upsertOneAccountType: AccountType;
  upsertOneAthleteProfile: AthleteProfile;
  upsertOneBlocks: Blocks;
  upsertOneCoachProfile: CoachProfile;
  upsertOneComment: Comment;
  upsertOneCommentLike: CommentLike;
  upsertOneCountry: Country;
  upsertOneEvaluation: Evaluation;
  upsertOneFollows: Follows;
  upsertOneInterestedSchools: InterestedSchools;
  upsertOnePosition: Position;
  upsertOnePositionCategory: PositionCategory;
  upsertOnePost: Post;
  upsertOnePostFlag: PostFlag;
  upsertOnePostLike: PostLike;
  upsertOneProspectedAthlete: ProspectedAthlete;
  upsertOneRecruitedAthlete: RecruitedAthlete;
  upsertOneRole: Role;
  upsertOneSchool: School;
  upsertOneSchoolType: SchoolType;
  upsertOneSkillType: SkillType;
  upsertOneSkills: Skills;
  upsertOneTranscripts: Transcripts;
  upsertOneUser: User;
};


export type MutationCreateManyAccountTypeArgs = {
  data: Array<AccountTypeCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyAthleteProfileArgs = {
  data: Array<AthleteProfileCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyBlocksArgs = {
  data: Array<BlocksCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyCoachProfileArgs = {
  data: Array<CoachProfileCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyCommentArgs = {
  data: Array<CommentCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyCommentLikeArgs = {
  data: Array<CommentLikeCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyCountryArgs = {
  data: Array<CountryCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyEvaluationArgs = {
  data: Array<EvaluationCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyFollowsArgs = {
  data: Array<FollowsCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyInterestedSchoolsArgs = {
  data: Array<InterestedSchoolsCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyPositionArgs = {
  data: Array<PositionCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyPositionCategoryArgs = {
  data: Array<PositionCategoryCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyPostArgs = {
  data: Array<PostCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyPostFlagArgs = {
  data: Array<PostFlagCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyPostLikeArgs = {
  data: Array<PostLikeCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyProspectedAthleteArgs = {
  data: Array<ProspectedAthleteCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyRecruitedAthleteArgs = {
  data: Array<RecruitedAthleteCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyRoleArgs = {
  data: Array<RoleCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManySchoolArgs = {
  data: Array<SchoolCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManySchoolTypeArgs = {
  data: Array<SchoolTypeCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManySkillTypeArgs = {
  data: Array<SkillTypeCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManySkillsArgs = {
  data: Array<SkillsCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyTranscriptsArgs = {
  data: Array<TranscriptsCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyUserArgs = {
  data: Array<UserCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateOneAccountTypeArgs = {
  data: AccountTypeCreateInput;
};


export type MutationCreateOneAthleteProfileArgs = {
  data: AthleteProfileCreateInput;
};


export type MutationCreateOneBlocksArgs = {
  data: BlocksCreateInput;
};


export type MutationCreateOneCoachProfileArgs = {
  data: CoachProfileCreateInput;
};


export type MutationCreateOneCommentArgs = {
  data: CommentCreateInput;
};


export type MutationCreateOneCommentLikeArgs = {
  data: CommentLikeCreateInput;
};


export type MutationCreateOneCountryArgs = {
  data: CountryCreateInput;
};


export type MutationCreateOneEvaluationArgs = {
  data: EvaluationCreateInput;
};


export type MutationCreateOneFollowsArgs = {
  data: FollowsCreateInput;
};


export type MutationCreateOneInterestedSchoolsArgs = {
  data: InterestedSchoolsCreateInput;
};


export type MutationCreateOnePositionArgs = {
  data: PositionCreateInput;
};


export type MutationCreateOnePositionCategoryArgs = {
  data: PositionCategoryCreateInput;
};


export type MutationCreateOnePostArgs = {
  data: PostCreateInput;
};


export type MutationCreateOnePostFlagArgs = {
  data: PostFlagCreateInput;
};


export type MutationCreateOnePostLikeArgs = {
  data: PostLikeCreateInput;
};


export type MutationCreateOneProspectedAthleteArgs = {
  data: ProspectedAthleteCreateInput;
};


export type MutationCreateOneRecruitedAthleteArgs = {
  data: RecruitedAthleteCreateInput;
};


export type MutationCreateOneRoleArgs = {
  data: RoleCreateInput;
};


export type MutationCreateOneSchoolArgs = {
  data: SchoolCreateInput;
};


export type MutationCreateOneSchoolTypeArgs = {
  data: SchoolTypeCreateInput;
};


export type MutationCreateOneSkillTypeArgs = {
  data: SkillTypeCreateInput;
};


export type MutationCreateOneSkillsArgs = {
  data: SkillsCreateInput;
};


export type MutationCreateOneTranscriptsArgs = {
  data: TranscriptsCreateInput;
};


export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteManyAccountTypeArgs = {
  where?: InputMaybe<AccountTypeWhereInput>;
};


export type MutationDeleteManyAthleteProfileArgs = {
  where?: InputMaybe<AthleteProfileWhereInput>;
};


export type MutationDeleteManyBlocksArgs = {
  where?: InputMaybe<BlocksWhereInput>;
};


export type MutationDeleteManyCoachProfileArgs = {
  where?: InputMaybe<CoachProfileWhereInput>;
};


export type MutationDeleteManyCommentArgs = {
  where?: InputMaybe<CommentWhereInput>;
};


export type MutationDeleteManyCommentLikeArgs = {
  where?: InputMaybe<CommentLikeWhereInput>;
};


export type MutationDeleteManyCountryArgs = {
  where?: InputMaybe<CountryWhereInput>;
};


export type MutationDeleteManyEvaluationArgs = {
  where?: InputMaybe<EvaluationWhereInput>;
};


export type MutationDeleteManyFollowsArgs = {
  where?: InputMaybe<FollowsWhereInput>;
};


export type MutationDeleteManyInterestedSchoolsArgs = {
  where?: InputMaybe<InterestedSchoolsWhereInput>;
};


export type MutationDeleteManyPositionArgs = {
  where?: InputMaybe<PositionWhereInput>;
};


export type MutationDeleteManyPositionCategoryArgs = {
  where?: InputMaybe<PositionCategoryWhereInput>;
};


export type MutationDeleteManyPostArgs = {
  where?: InputMaybe<PostWhereInput>;
};


export type MutationDeleteManyPostFlagArgs = {
  where?: InputMaybe<PostFlagWhereInput>;
};


export type MutationDeleteManyPostLikeArgs = {
  where?: InputMaybe<PostLikeWhereInput>;
};


export type MutationDeleteManyProspectedAthleteArgs = {
  where?: InputMaybe<ProspectedAthleteWhereInput>;
};


export type MutationDeleteManyRecruitedAthleteArgs = {
  where?: InputMaybe<RecruitedAthleteWhereInput>;
};


export type MutationDeleteManyRoleArgs = {
  where?: InputMaybe<RoleWhereInput>;
};


export type MutationDeleteManySchoolArgs = {
  where?: InputMaybe<SchoolWhereInput>;
};


export type MutationDeleteManySchoolTypeArgs = {
  where?: InputMaybe<SchoolTypeWhereInput>;
};


export type MutationDeleteManySkillTypeArgs = {
  where?: InputMaybe<SkillTypeWhereInput>;
};


export type MutationDeleteManySkillsArgs = {
  where?: InputMaybe<SkillsWhereInput>;
};


export type MutationDeleteManyTranscriptsArgs = {
  where?: InputMaybe<TranscriptsWhereInput>;
};


export type MutationDeleteManyUserArgs = {
  where?: InputMaybe<UserWhereInput>;
};


export type MutationDeleteOneAccountTypeArgs = {
  where: AccountTypeWhereUniqueInput;
};


export type MutationDeleteOneAthleteProfileArgs = {
  where: AthleteProfileWhereUniqueInput;
};


export type MutationDeleteOneBlocksArgs = {
  where: BlocksWhereUniqueInput;
};


export type MutationDeleteOneCoachProfileArgs = {
  where: CoachProfileWhereUniqueInput;
};


export type MutationDeleteOneCommentArgs = {
  where: CommentWhereUniqueInput;
};


export type MutationDeleteOneCommentLikeArgs = {
  where: CommentLikeWhereUniqueInput;
};


export type MutationDeleteOneCountryArgs = {
  where: CountryWhereUniqueInput;
};


export type MutationDeleteOneEvaluationArgs = {
  where: EvaluationWhereUniqueInput;
};


export type MutationDeleteOneFollowsArgs = {
  where: FollowsWhereUniqueInput;
};


export type MutationDeleteOneInterestedSchoolsArgs = {
  where: InterestedSchoolsWhereUniqueInput;
};


export type MutationDeleteOnePositionArgs = {
  where: PositionWhereUniqueInput;
};


export type MutationDeleteOnePositionCategoryArgs = {
  where: PositionCategoryWhereUniqueInput;
};


export type MutationDeleteOnePostArgs = {
  where: PostWhereUniqueInput;
};


export type MutationDeleteOnePostFlagArgs = {
  where: PostFlagWhereUniqueInput;
};


export type MutationDeleteOnePostLikeArgs = {
  where: PostLikeWhereUniqueInput;
};


export type MutationDeleteOneProspectedAthleteArgs = {
  where: ProspectedAthleteWhereUniqueInput;
};


export type MutationDeleteOneRecruitedAthleteArgs = {
  where: RecruitedAthleteWhereUniqueInput;
};


export type MutationDeleteOneRoleArgs = {
  where: RoleWhereUniqueInput;
};


export type MutationDeleteOneSchoolArgs = {
  where: SchoolWhereUniqueInput;
};


export type MutationDeleteOneSchoolTypeArgs = {
  where: SchoolTypeWhereUniqueInput;
};


export type MutationDeleteOneSkillTypeArgs = {
  where: SkillTypeWhereUniqueInput;
};


export type MutationDeleteOneSkillsArgs = {
  where: SkillsWhereUniqueInput;
};


export type MutationDeleteOneTranscriptsArgs = {
  where: TranscriptsWhereUniqueInput;
};


export type MutationDeleteOneUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationProcessVideoArgs = {
  data: ProcessVideoInput;
};


export type MutationRegisterCoachArgs = {
  data: UserCreateInput;
};


export type MutationSendPushNotificationToUserArgs = {
  data: SendPushNotificationToUserInput;
};


export type MutationUpdateManyAccountTypeArgs = {
  data: AccountTypeUpdateManyMutationInput;
  where?: InputMaybe<AccountTypeWhereInput>;
};


export type MutationUpdateManyAthleteProfileArgs = {
  data: AthleteProfileUpdateManyMutationInput;
  where?: InputMaybe<AthleteProfileWhereInput>;
};


export type MutationUpdateManyBlocksArgs = {
  data: BlocksUpdateManyMutationInput;
  where?: InputMaybe<BlocksWhereInput>;
};


export type MutationUpdateManyCoachProfileArgs = {
  data: CoachProfileUpdateManyMutationInput;
  where?: InputMaybe<CoachProfileWhereInput>;
};


export type MutationUpdateManyCommentArgs = {
  data: CommentUpdateManyMutationInput;
  where?: InputMaybe<CommentWhereInput>;
};


export type MutationUpdateManyCommentLikeArgs = {
  data: CommentLikeUpdateManyMutationInput;
  where?: InputMaybe<CommentLikeWhereInput>;
};


export type MutationUpdateManyCountryArgs = {
  data: CountryUpdateManyMutationInput;
  where?: InputMaybe<CountryWhereInput>;
};


export type MutationUpdateManyEvaluationArgs = {
  data: EvaluationUpdateManyMutationInput;
  where?: InputMaybe<EvaluationWhereInput>;
};


export type MutationUpdateManyFollowsArgs = {
  data: FollowsUpdateManyMutationInput;
  where?: InputMaybe<FollowsWhereInput>;
};


export type MutationUpdateManyInterestedSchoolsArgs = {
  data: InterestedSchoolsUpdateManyMutationInput;
  where?: InputMaybe<InterestedSchoolsWhereInput>;
};


export type MutationUpdateManyPositionArgs = {
  data: PositionUpdateManyMutationInput;
  where?: InputMaybe<PositionWhereInput>;
};


export type MutationUpdateManyPositionCategoryArgs = {
  data: PositionCategoryUpdateManyMutationInput;
  where?: InputMaybe<PositionCategoryWhereInput>;
};


export type MutationUpdateManyPostArgs = {
  data: PostUpdateManyMutationInput;
  where?: InputMaybe<PostWhereInput>;
};


export type MutationUpdateManyPostFlagArgs = {
  data: PostFlagUpdateManyMutationInput;
  where?: InputMaybe<PostFlagWhereInput>;
};


export type MutationUpdateManyPostLikeArgs = {
  data: PostLikeUpdateManyMutationInput;
  where?: InputMaybe<PostLikeWhereInput>;
};


export type MutationUpdateManyProspectedAthleteArgs = {
  data: ProspectedAthleteUpdateManyMutationInput;
  where?: InputMaybe<ProspectedAthleteWhereInput>;
};


export type MutationUpdateManyRecruitedAthleteArgs = {
  data: RecruitedAthleteUpdateManyMutationInput;
  where?: InputMaybe<RecruitedAthleteWhereInput>;
};


export type MutationUpdateManyRoleArgs = {
  data: RoleUpdateManyMutationInput;
  where?: InputMaybe<RoleWhereInput>;
};


export type MutationUpdateManySchoolArgs = {
  data: SchoolUpdateManyMutationInput;
  where?: InputMaybe<SchoolWhereInput>;
};


export type MutationUpdateManySchoolTypeArgs = {
  data: SchoolTypeUpdateManyMutationInput;
  where?: InputMaybe<SchoolTypeWhereInput>;
};


export type MutationUpdateManySkillTypeArgs = {
  data: SkillTypeUpdateManyMutationInput;
  where?: InputMaybe<SkillTypeWhereInput>;
};


export type MutationUpdateManySkillsArgs = {
  data: SkillsUpdateManyMutationInput;
  where?: InputMaybe<SkillsWhereInput>;
};


export type MutationUpdateManyTranscriptsArgs = {
  data: TranscriptsUpdateManyMutationInput;
  where?: InputMaybe<TranscriptsWhereInput>;
};


export type MutationUpdateManyUserArgs = {
  data: UserUpdateManyMutationInput;
  where?: InputMaybe<UserWhereInput>;
};


export type MutationUpdateOneAccountTypeArgs = {
  data: AccountTypeUpdateInput;
  where: AccountTypeWhereUniqueInput;
};


export type MutationUpdateOneAthleteProfileArgs = {
  data: AthleteProfileUpdateInput;
  where: AthleteProfileWhereUniqueInput;
};


export type MutationUpdateOneBlocksArgs = {
  data: BlocksUpdateInput;
  where: BlocksWhereUniqueInput;
};


export type MutationUpdateOneCoachProfileArgs = {
  data: CoachProfileUpdateInput;
  where: CoachProfileWhereUniqueInput;
};


export type MutationUpdateOneCommentArgs = {
  data: CommentUpdateInput;
  where: CommentWhereUniqueInput;
};


export type MutationUpdateOneCommentLikeArgs = {
  data: CommentLikeUpdateInput;
  where: CommentLikeWhereUniqueInput;
};


export type MutationUpdateOneCountryArgs = {
  data: CountryUpdateInput;
  where: CountryWhereUniqueInput;
};


export type MutationUpdateOneEvaluationArgs = {
  data: EvaluationUpdateInput;
  where: EvaluationWhereUniqueInput;
};


export type MutationUpdateOneFollowsArgs = {
  data: FollowsUpdateInput;
  where: FollowsWhereUniqueInput;
};


export type MutationUpdateOneInterestedSchoolsArgs = {
  data: InterestedSchoolsUpdateInput;
  where: InterestedSchoolsWhereUniqueInput;
};


export type MutationUpdateOnePositionArgs = {
  data: PositionUpdateInput;
  where: PositionWhereUniqueInput;
};


export type MutationUpdateOnePositionCategoryArgs = {
  data: PositionCategoryUpdateInput;
  where: PositionCategoryWhereUniqueInput;
};


export type MutationUpdateOnePostArgs = {
  data: PostUpdateInput;
  where: PostWhereUniqueInput;
};


export type MutationUpdateOnePostFlagArgs = {
  data: PostFlagUpdateInput;
  where: PostFlagWhereUniqueInput;
};


export type MutationUpdateOnePostLikeArgs = {
  data: PostLikeUpdateInput;
  where: PostLikeWhereUniqueInput;
};


export type MutationUpdateOneProspectedAthleteArgs = {
  data: ProspectedAthleteUpdateInput;
  where: ProspectedAthleteWhereUniqueInput;
};


export type MutationUpdateOneRecruitedAthleteArgs = {
  data: RecruitedAthleteUpdateInput;
  where: RecruitedAthleteWhereUniqueInput;
};


export type MutationUpdateOneRoleArgs = {
  data: RoleUpdateInput;
  where: RoleWhereUniqueInput;
};


export type MutationUpdateOneSchoolArgs = {
  data: SchoolUpdateInput;
  where: SchoolWhereUniqueInput;
};


export type MutationUpdateOneSchoolTypeArgs = {
  data: SchoolTypeUpdateInput;
  where: SchoolTypeWhereUniqueInput;
};


export type MutationUpdateOneSkillTypeArgs = {
  data: SkillTypeUpdateInput;
  where: SkillTypeWhereUniqueInput;
};


export type MutationUpdateOneSkillsArgs = {
  data: SkillsUpdateInput;
  where: SkillsWhereUniqueInput;
};


export type MutationUpdateOneTranscriptsArgs = {
  data: TranscriptsUpdateInput;
  where: TranscriptsWhereUniqueInput;
};


export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUserFcmTokenArgs = {
  data: UpdateUserFcmTokenInput;
};


export type MutationUpsertOneAccountTypeArgs = {
  create: AccountTypeCreateInput;
  update: AccountTypeUpdateInput;
  where: AccountTypeWhereUniqueInput;
};


export type MutationUpsertOneAthleteProfileArgs = {
  create: AthleteProfileCreateInput;
  update: AthleteProfileUpdateInput;
  where: AthleteProfileWhereUniqueInput;
};


export type MutationUpsertOneBlocksArgs = {
  create: BlocksCreateInput;
  update: BlocksUpdateInput;
  where: BlocksWhereUniqueInput;
};


export type MutationUpsertOneCoachProfileArgs = {
  create: CoachProfileCreateInput;
  update: CoachProfileUpdateInput;
  where: CoachProfileWhereUniqueInput;
};


export type MutationUpsertOneCommentArgs = {
  create: CommentCreateInput;
  update: CommentUpdateInput;
  where: CommentWhereUniqueInput;
};


export type MutationUpsertOneCommentLikeArgs = {
  create: CommentLikeCreateInput;
  update: CommentLikeUpdateInput;
  where: CommentLikeWhereUniqueInput;
};


export type MutationUpsertOneCountryArgs = {
  create: CountryCreateInput;
  update: CountryUpdateInput;
  where: CountryWhereUniqueInput;
};


export type MutationUpsertOneEvaluationArgs = {
  create: EvaluationCreateInput;
  update: EvaluationUpdateInput;
  where: EvaluationWhereUniqueInput;
};


export type MutationUpsertOneFollowsArgs = {
  create: FollowsCreateInput;
  update: FollowsUpdateInput;
  where: FollowsWhereUniqueInput;
};


export type MutationUpsertOneInterestedSchoolsArgs = {
  create: InterestedSchoolsCreateInput;
  update: InterestedSchoolsUpdateInput;
  where: InterestedSchoolsWhereUniqueInput;
};


export type MutationUpsertOnePositionArgs = {
  create: PositionCreateInput;
  update: PositionUpdateInput;
  where: PositionWhereUniqueInput;
};


export type MutationUpsertOnePositionCategoryArgs = {
  create: PositionCategoryCreateInput;
  update: PositionCategoryUpdateInput;
  where: PositionCategoryWhereUniqueInput;
};


export type MutationUpsertOnePostArgs = {
  create: PostCreateInput;
  update: PostUpdateInput;
  where: PostWhereUniqueInput;
};


export type MutationUpsertOnePostFlagArgs = {
  create: PostFlagCreateInput;
  update: PostFlagUpdateInput;
  where: PostFlagWhereUniqueInput;
};


export type MutationUpsertOnePostLikeArgs = {
  create: PostLikeCreateInput;
  update: PostLikeUpdateInput;
  where: PostLikeWhereUniqueInput;
};


export type MutationUpsertOneProspectedAthleteArgs = {
  create: ProspectedAthleteCreateInput;
  update: ProspectedAthleteUpdateInput;
  where: ProspectedAthleteWhereUniqueInput;
};


export type MutationUpsertOneRecruitedAthleteArgs = {
  create: RecruitedAthleteCreateInput;
  update: RecruitedAthleteUpdateInput;
  where: RecruitedAthleteWhereUniqueInput;
};


export type MutationUpsertOneRoleArgs = {
  create: RoleCreateInput;
  update: RoleUpdateInput;
  where: RoleWhereUniqueInput;
};


export type MutationUpsertOneSchoolArgs = {
  create: SchoolCreateInput;
  update: SchoolUpdateInput;
  where: SchoolWhereUniqueInput;
};


export type MutationUpsertOneSchoolTypeArgs = {
  create: SchoolTypeCreateInput;
  update: SchoolTypeUpdateInput;
  where: SchoolTypeWhereUniqueInput;
};


export type MutationUpsertOneSkillTypeArgs = {
  create: SkillTypeCreateInput;
  update: SkillTypeUpdateInput;
  where: SkillTypeWhereUniqueInput;
};


export type MutationUpsertOneSkillsArgs = {
  create: SkillsCreateInput;
  update: SkillsUpdateInput;
  where: SkillsWhereUniqueInput;
};


export type MutationUpsertOneTranscriptsArgs = {
  create: TranscriptsCreateInput;
  update: TranscriptsUpdateInput;
  where: TranscriptsWhereUniqueInput;
};


export type MutationUpsertOneUserArgs = {
  create: UserCreateInput;
  update: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type NestedBigIntFilter = {
  equals?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  not?: InputMaybe<NestedBigIntFilter>;
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type NestedBigIntNullableFilter = {
  equals?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  not?: InputMaybe<NestedBigIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type NestedBigIntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedBigIntNullableFilter>;
  _min?: InputMaybe<NestedBigIntNullableFilter>;
  _sum?: InputMaybe<NestedBigIntNullableFilter>;
  equals?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  not?: InputMaybe<NestedBigIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type NestedBigIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBigIntFilter>;
  _min?: InputMaybe<NestedBigIntFilter>;
  _sum?: InputMaybe<NestedBigIntFilter>;
  equals?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  not?: InputMaybe<NestedBigIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type NestedBoolNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedBoolNullableFilter>;
  _min?: InputMaybe<NestedBoolNullableFilter>;
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolNullableWithAggregatesFilter>;
};

export type NestedBoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDateTimeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedDateTimeNullableFilter>;
  _min?: InputMaybe<NestedDateTimeNullableFilter>;
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedEnumEvaluationTypeFilter = {
  equals?: InputMaybe<EvaluationType>;
  in?: InputMaybe<Array<EvaluationType>>;
  not?: InputMaybe<NestedEnumEvaluationTypeFilter>;
  notIn?: InputMaybe<Array<EvaluationType>>;
};

export type NestedEnumEvaluationTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumEvaluationTypeFilter>;
  _min?: InputMaybe<NestedEnumEvaluationTypeFilter>;
  equals?: InputMaybe<EvaluationType>;
  in?: InputMaybe<Array<EvaluationType>>;
  not?: InputMaybe<NestedEnumEvaluationTypeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<EvaluationType>>;
};

export type NestedEnumVisibilityFilter = {
  equals?: InputMaybe<Visibility>;
  in?: InputMaybe<Array<Visibility>>;
  not?: InputMaybe<NestedEnumVisibilityFilter>;
  notIn?: InputMaybe<Array<Visibility>>;
};

export type NestedEnumVisibilityWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumVisibilityFilter>;
  _min?: InputMaybe<NestedEnumVisibilityFilter>;
  equals?: InputMaybe<Visibility>;
  in?: InputMaybe<Array<Visibility>>;
  not?: InputMaybe<NestedEnumVisibilityWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Visibility>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedFloatNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedFloatNullableFilter>;
  _min?: InputMaybe<NestedFloatNullableFilter>;
  _sum?: InputMaybe<NestedFloatNullableFilter>;
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedIntNullableFilter>;
  _sum?: InputMaybe<NestedIntNullableFilter>;
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NullableBoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NullableFloatFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Float']['input']>;
  divide?: InputMaybe<Scalars['Float']['input']>;
  increment?: InputMaybe<Scalars['Float']['input']>;
  multiply?: InputMaybe<Scalars['Float']['input']>;
  set?: InputMaybe<Scalars['Float']['input']>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type PermissionCreateNestedManyWithoutRolesInput = {
  connect?: InputMaybe<Array<PermissionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PermissionCreateOrConnectWithoutRolesInput>>;
  create?: InputMaybe<Array<PermissionCreateWithoutRolesInput>>;
};

export type PermissionCreateOrConnectWithoutRolesInput = {
  create: PermissionCreateWithoutRolesInput;
  where: PermissionWhereUniqueInput;
};

export type PermissionCreateWithoutRolesInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  query: Scalars['String']['input'];
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PermissionListRelationFilter = {
  every?: InputMaybe<PermissionWhereInput>;
  none?: InputMaybe<PermissionWhereInput>;
  some?: InputMaybe<PermissionWhereInput>;
};

export type PermissionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PermissionScalarWhereInput = {
  AND?: InputMaybe<Array<PermissionScalarWhereInput>>;
  NOT?: InputMaybe<Array<PermissionScalarWhereInput>>;
  OR?: InputMaybe<Array<PermissionScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  query?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type PermissionUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  query?: InputMaybe<StringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PermissionUpdateManyWithWhereWithoutRolesInput = {
  data: PermissionUpdateManyMutationInput;
  where: PermissionScalarWhereInput;
};

export type PermissionUpdateManyWithoutRolesNestedInput = {
  connect?: InputMaybe<Array<PermissionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PermissionCreateOrConnectWithoutRolesInput>>;
  create?: InputMaybe<Array<PermissionCreateWithoutRolesInput>>;
  delete?: InputMaybe<Array<PermissionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PermissionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PermissionWhereUniqueInput>>;
  set?: InputMaybe<Array<PermissionWhereUniqueInput>>;
  update?: InputMaybe<Array<PermissionUpdateWithWhereUniqueWithoutRolesInput>>;
  updateMany?: InputMaybe<Array<PermissionUpdateManyWithWhereWithoutRolesInput>>;
  upsert?: InputMaybe<Array<PermissionUpsertWithWhereUniqueWithoutRolesInput>>;
};

export type PermissionUpdateWithWhereUniqueWithoutRolesInput = {
  data: PermissionUpdateWithoutRolesInput;
  where: PermissionWhereUniqueInput;
};

export type PermissionUpdateWithoutRolesInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  query?: InputMaybe<StringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PermissionUpsertWithWhereUniqueWithoutRolesInput = {
  create: PermissionCreateWithoutRolesInput;
  update: PermissionUpdateWithoutRolesInput;
  where: PermissionWhereUniqueInput;
};

export type PermissionWhereInput = {
  AND?: InputMaybe<Array<PermissionWhereInput>>;
  NOT?: InputMaybe<Array<PermissionWhereInput>>;
  OR?: InputMaybe<Array<PermissionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  query?: InputMaybe<StringFilter>;
  roles?: InputMaybe<RoleListRelationFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type PermissionWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type Position = {
  __typename?: 'Position';
  _count?: Maybe<PositionCount>;
  athleteProfiles: Array<AthleteProfile>;
  category?: Maybe<PositionCategory>;
  categoryId?: Maybe<Scalars['BigInt']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};


export type PositionAthleteProfilesArgs = {
  cursor?: InputMaybe<AthleteProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<AthleteProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AthleteProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AthleteProfileWhereInput>;
};

export type PositionAvgAggregate = {
  __typename?: 'PositionAvgAggregate';
  categoryId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type PositionAvgOrderByAggregateInput = {
  categoryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type PositionCategory = {
  __typename?: 'PositionCategory';
  _count?: Maybe<PositionCategoryCount>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  positions: Array<Position>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};


export type PositionCategoryPositionsArgs = {
  cursor?: InputMaybe<PositionWhereUniqueInput>;
  distinct?: InputMaybe<Array<PositionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PositionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PositionWhereInput>;
};

export type PositionCategoryAvgAggregate = {
  __typename?: 'PositionCategoryAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type PositionCategoryAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type PositionCategoryCount = {
  __typename?: 'PositionCategoryCount';
  positions: Scalars['Int']['output'];
};

export type PositionCategoryCountAggregate = {
  __typename?: 'PositionCategoryCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type PositionCategoryCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PositionCategoryCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  positions?: InputMaybe<PositionCreateNestedManyWithoutCategoryInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PositionCategoryCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PositionCategoryCreateNestedOneWithoutPositionsInput = {
  connect?: InputMaybe<PositionCategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PositionCategoryCreateOrConnectWithoutPositionsInput>;
  create?: InputMaybe<PositionCategoryCreateWithoutPositionsInput>;
};

export type PositionCategoryCreateOrConnectWithoutPositionsInput = {
  create: PositionCategoryCreateWithoutPositionsInput;
  where: PositionCategoryWhereUniqueInput;
};

export type PositionCategoryCreateWithoutPositionsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PositionCategoryGroupBy = {
  __typename?: 'PositionCategoryGroupBy';
  _avg?: Maybe<PositionCategoryAvgAggregate>;
  _count?: Maybe<PositionCategoryCountAggregate>;
  _max?: Maybe<PositionCategoryMaxAggregate>;
  _min?: Maybe<PositionCategoryMinAggregate>;
  _sum?: Maybe<PositionCategorySumAggregate>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type PositionCategoryMaxAggregate = {
  __typename?: 'PositionCategoryMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type PositionCategoryMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PositionCategoryMinAggregate = {
  __typename?: 'PositionCategoryMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type PositionCategoryMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PositionCategoryOrderByWithAggregationInput = {
  _avg?: InputMaybe<PositionCategoryAvgOrderByAggregateInput>;
  _count?: InputMaybe<PositionCategoryCountOrderByAggregateInput>;
  _max?: InputMaybe<PositionCategoryMaxOrderByAggregateInput>;
  _min?: InputMaybe<PositionCategoryMinOrderByAggregateInput>;
  _sum?: InputMaybe<PositionCategorySumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PositionCategoryOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  positions?: InputMaybe<PositionOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PositionCategoryRelationFilter = {
  is?: InputMaybe<PositionCategoryWhereInput>;
  isNot?: InputMaybe<PositionCategoryWhereInput>;
};

export enum PositionCategoryScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt',
  Uuid = 'uuid'
}

export type PositionCategoryScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PositionCategoryScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<PositionCategoryScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PositionCategoryScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
};

export type PositionCategorySumAggregate = {
  __typename?: 'PositionCategorySumAggregate';
  id?: Maybe<Scalars['BigInt']['output']>;
};

export type PositionCategorySumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type PositionCategoryUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  positions?: InputMaybe<PositionUpdateManyWithoutCategoryNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PositionCategoryUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PositionCategoryUpdateOneWithoutPositionsNestedInput = {
  connect?: InputMaybe<PositionCategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PositionCategoryCreateOrConnectWithoutPositionsInput>;
  create?: InputMaybe<PositionCategoryCreateWithoutPositionsInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<PositionCategoryUpdateWithoutPositionsInput>;
  upsert?: InputMaybe<PositionCategoryUpsertWithoutPositionsInput>;
};

export type PositionCategoryUpdateWithoutPositionsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PositionCategoryUpsertWithoutPositionsInput = {
  create: PositionCategoryCreateWithoutPositionsInput;
  update: PositionCategoryUpdateWithoutPositionsInput;
};

export type PositionCategoryWhereInput = {
  AND?: InputMaybe<Array<PositionCategoryWhereInput>>;
  NOT?: InputMaybe<Array<PositionCategoryWhereInput>>;
  OR?: InputMaybe<Array<PositionCategoryWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  positions?: InputMaybe<PositionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type PositionCategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PositionCount = {
  __typename?: 'PositionCount';
  athleteProfiles: Scalars['Int']['output'];
};

export type PositionCountAggregate = {
  __typename?: 'PositionCountAggregate';
  _all: Scalars['Int']['output'];
  categoryId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  shortName: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type PositionCountOrderByAggregateInput = {
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  shortName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PositionCreateInput = {
  athleteProfiles?: InputMaybe<AthleteProfileCreateNestedManyWithoutPositionInput>;
  category?: InputMaybe<PositionCategoryCreateNestedOneWithoutPositionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PositionCreateManyCategoryInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PositionCreateManyCategoryInputEnvelope = {
  data: Array<PositionCreateManyCategoryInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PositionCreateManyInput = {
  categoryId?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PositionCreateNestedManyWithoutCategoryInput = {
  connect?: InputMaybe<Array<PositionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PositionCreateOrConnectWithoutCategoryInput>>;
  create?: InputMaybe<Array<PositionCreateWithoutCategoryInput>>;
  createMany?: InputMaybe<PositionCreateManyCategoryInputEnvelope>;
};

export type PositionCreateNestedOneWithoutAthleteProfilesInput = {
  connect?: InputMaybe<PositionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PositionCreateOrConnectWithoutAthleteProfilesInput>;
  create?: InputMaybe<PositionCreateWithoutAthleteProfilesInput>;
};

export type PositionCreateOrConnectWithoutAthleteProfilesInput = {
  create: PositionCreateWithoutAthleteProfilesInput;
  where: PositionWhereUniqueInput;
};

export type PositionCreateOrConnectWithoutCategoryInput = {
  create: PositionCreateWithoutCategoryInput;
  where: PositionWhereUniqueInput;
};

export type PositionCreateWithoutAthleteProfilesInput = {
  category?: InputMaybe<PositionCategoryCreateNestedOneWithoutPositionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PositionCreateWithoutCategoryInput = {
  athleteProfiles?: InputMaybe<AthleteProfileCreateNestedManyWithoutPositionInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PositionGroupBy = {
  __typename?: 'PositionGroupBy';
  _avg?: Maybe<PositionAvgAggregate>;
  _count?: Maybe<PositionCountAggregate>;
  _max?: Maybe<PositionMaxAggregate>;
  _min?: Maybe<PositionMinAggregate>;
  _sum?: Maybe<PositionSumAggregate>;
  categoryId?: Maybe<Scalars['BigInt']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type PositionListRelationFilter = {
  every?: InputMaybe<PositionWhereInput>;
  none?: InputMaybe<PositionWhereInput>;
  some?: InputMaybe<PositionWhereInput>;
};

export type PositionMaxAggregate = {
  __typename?: 'PositionMaxAggregate';
  categoryId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  shortName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type PositionMaxOrderByAggregateInput = {
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  shortName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PositionMinAggregate = {
  __typename?: 'PositionMinAggregate';
  categoryId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  shortName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type PositionMinOrderByAggregateInput = {
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  shortName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PositionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PositionOrderByWithAggregationInput = {
  _avg?: InputMaybe<PositionAvgOrderByAggregateInput>;
  _count?: InputMaybe<PositionCountOrderByAggregateInput>;
  _max?: InputMaybe<PositionMaxOrderByAggregateInput>;
  _min?: InputMaybe<PositionMinOrderByAggregateInput>;
  _sum?: InputMaybe<PositionSumOrderByAggregateInput>;
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  shortName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PositionOrderByWithRelationInput = {
  athleteProfiles?: InputMaybe<AthleteProfileOrderByRelationAggregateInput>;
  category?: InputMaybe<PositionCategoryOrderByWithRelationInput>;
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  shortName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PositionRelationFilter = {
  is?: InputMaybe<PositionWhereInput>;
  isNot?: InputMaybe<PositionWhereInput>;
};

export enum PositionScalarFieldEnum {
  CategoryId = 'categoryId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  ShortName = 'shortName',
  UpdatedAt = 'updatedAt',
  Uuid = 'uuid'
}

export type PositionScalarWhereInput = {
  AND?: InputMaybe<Array<PositionScalarWhereInput>>;
  NOT?: InputMaybe<Array<PositionScalarWhereInput>>;
  OR?: InputMaybe<Array<PositionScalarWhereInput>>;
  categoryId?: InputMaybe<BigIntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  shortName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type PositionScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PositionScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<PositionScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PositionScalarWhereWithAggregatesInput>>;
  categoryId?: InputMaybe<BigIntNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  shortName?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
};

export type PositionSumAggregate = {
  __typename?: 'PositionSumAggregate';
  categoryId?: Maybe<Scalars['BigInt']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
};

export type PositionSumOrderByAggregateInput = {
  categoryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type PositionUpdateInput = {
  athleteProfiles?: InputMaybe<AthleteProfileUpdateManyWithoutPositionNestedInput>;
  category?: InputMaybe<PositionCategoryUpdateOneWithoutPositionsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  shortName?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PositionUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  shortName?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PositionUpdateManyWithWhereWithoutCategoryInput = {
  data: PositionUpdateManyMutationInput;
  where: PositionScalarWhereInput;
};

export type PositionUpdateManyWithoutCategoryNestedInput = {
  connect?: InputMaybe<Array<PositionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PositionCreateOrConnectWithoutCategoryInput>>;
  create?: InputMaybe<Array<PositionCreateWithoutCategoryInput>>;
  createMany?: InputMaybe<PositionCreateManyCategoryInputEnvelope>;
  delete?: InputMaybe<Array<PositionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PositionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PositionWhereUniqueInput>>;
  set?: InputMaybe<Array<PositionWhereUniqueInput>>;
  update?: InputMaybe<Array<PositionUpdateWithWhereUniqueWithoutCategoryInput>>;
  updateMany?: InputMaybe<Array<PositionUpdateManyWithWhereWithoutCategoryInput>>;
  upsert?: InputMaybe<Array<PositionUpsertWithWhereUniqueWithoutCategoryInput>>;
};

export type PositionUpdateOneWithoutAthleteProfilesNestedInput = {
  connect?: InputMaybe<PositionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PositionCreateOrConnectWithoutAthleteProfilesInput>;
  create?: InputMaybe<PositionCreateWithoutAthleteProfilesInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<PositionUpdateWithoutAthleteProfilesInput>;
  upsert?: InputMaybe<PositionUpsertWithoutAthleteProfilesInput>;
};

export type PositionUpdateWithWhereUniqueWithoutCategoryInput = {
  data: PositionUpdateWithoutCategoryInput;
  where: PositionWhereUniqueInput;
};

export type PositionUpdateWithoutAthleteProfilesInput = {
  category?: InputMaybe<PositionCategoryUpdateOneWithoutPositionsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  shortName?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PositionUpdateWithoutCategoryInput = {
  athleteProfiles?: InputMaybe<AthleteProfileUpdateManyWithoutPositionNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  shortName?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PositionUpsertWithWhereUniqueWithoutCategoryInput = {
  create: PositionCreateWithoutCategoryInput;
  update: PositionUpdateWithoutCategoryInput;
  where: PositionWhereUniqueInput;
};

export type PositionUpsertWithoutAthleteProfilesInput = {
  create: PositionCreateWithoutAthleteProfilesInput;
  update: PositionUpdateWithoutAthleteProfilesInput;
};

export type PositionWhereInput = {
  AND?: InputMaybe<Array<PositionWhereInput>>;
  NOT?: InputMaybe<Array<PositionWhereInput>>;
  OR?: InputMaybe<Array<PositionWhereInput>>;
  athleteProfiles?: InputMaybe<AthleteProfileListRelationFilter>;
  category?: InputMaybe<PositionCategoryRelationFilter>;
  categoryId?: InputMaybe<BigIntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  shortName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type PositionWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  _count?: Maybe<PostCount>;
  caption: Scalars['String']['output'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  images: Array<Scalars['String']['output']>;
  postFlag: Array<PostFlag>;
  postLikes: Array<PostLike>;
  postReports: Array<PostReport>;
  school?: Maybe<School>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
  videos: Array<Scalars['String']['output']>;
  videosAspectRatio: Array<Scalars['String']['output']>;
  visibility: Visibility;
};


export type PostCommentsArgs = {
  cursor?: InputMaybe<CommentWhereUniqueInput>;
  distinct?: InputMaybe<Array<CommentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CommentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentWhereInput>;
};


export type PostPostFlagArgs = {
  cursor?: InputMaybe<PostFlagWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostFlagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostFlagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostFlagWhereInput>;
};


export type PostPostLikesArgs = {
  cursor?: InputMaybe<PostLikeWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostLikeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostLikeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostLikeWhereInput>;
};


export type PostPostReportsArgs = {
  cursor?: InputMaybe<PostReportWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostReportScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostReportOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostReportWhereInput>;
};

export type PostAvgAggregate = {
  __typename?: 'PostAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  schoolId?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type PostAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type PostCount = {
  __typename?: 'PostCount';
  comments: Scalars['Int']['output'];
  postFlag: Scalars['Int']['output'];
  postLikes: Scalars['Int']['output'];
  postReports: Scalars['Int']['output'];
};

export type PostCountAggregate = {
  __typename?: 'PostCountAggregate';
  _all: Scalars['Int']['output'];
  caption: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  images: Scalars['Int']['output'];
  schoolId: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
  videos: Scalars['Int']['output'];
  videosAspectRatio: Scalars['Int']['output'];
  visibility: Scalars['Int']['output'];
};

export type PostCountOrderByAggregateInput = {
  caption?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  videos?: InputMaybe<SortOrder>;
  videosAspectRatio?: InputMaybe<SortOrder>;
  visibility?: InputMaybe<SortOrder>;
};

export type PostCreateInput = {
  caption: Scalars['String']['input'];
  comments?: InputMaybe<CommentCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<PostCreateimagesInput>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutPostInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutPostInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutPostInput>;
  school?: InputMaybe<SchoolCreateNestedOneWithoutPostsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutPostsInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<PostCreatevideosInput>;
  videosAspectRatio?: InputMaybe<PostCreatevideosAspectRatioInput>;
  visibility?: InputMaybe<Visibility>;
};

export type PostCreateManyInput = {
  caption: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<PostCreateimagesInput>;
  schoolId?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<PostCreatevideosInput>;
  videosAspectRatio?: InputMaybe<PostCreatevideosAspectRatioInput>;
  visibility?: InputMaybe<Visibility>;
};

export type PostCreateManySchoolInput = {
  caption: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<PostCreateimagesInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<PostCreatevideosInput>;
  videosAspectRatio?: InputMaybe<PostCreatevideosAspectRatioInput>;
  visibility?: InputMaybe<Visibility>;
};

export type PostCreateManySchoolInputEnvelope = {
  data: Array<PostCreateManySchoolInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PostCreateManyUserInput = {
  caption: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<PostCreateimagesInput>;
  schoolId?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<PostCreatevideosInput>;
  videosAspectRatio?: InputMaybe<PostCreatevideosAspectRatioInput>;
  visibility?: InputMaybe<Visibility>;
};

export type PostCreateManyUserInputEnvelope = {
  data: Array<PostCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PostCreateNestedManyWithoutSchoolInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<PostCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<PostCreateManySchoolInputEnvelope>;
};

export type PostCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<PostCreateWithoutUserInput>>;
  createMany?: InputMaybe<PostCreateManyUserInputEnvelope>;
};

export type PostCreateNestedOneWithoutCommentsInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<PostCreateWithoutCommentsInput>;
};

export type PostCreateNestedOneWithoutPostFlagInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutPostFlagInput>;
  create?: InputMaybe<PostCreateWithoutPostFlagInput>;
};

export type PostCreateNestedOneWithoutPostLikesInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutPostLikesInput>;
  create?: InputMaybe<PostCreateWithoutPostLikesInput>;
};

export type PostCreateNestedOneWithoutPostReportsInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutPostReportsInput>;
  create?: InputMaybe<PostCreateWithoutPostReportsInput>;
};

export type PostCreateOrConnectWithoutCommentsInput = {
  create: PostCreateWithoutCommentsInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutPostFlagInput = {
  create: PostCreateWithoutPostFlagInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutPostLikesInput = {
  create: PostCreateWithoutPostLikesInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutPostReportsInput = {
  create: PostCreateWithoutPostReportsInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutSchoolInput = {
  create: PostCreateWithoutSchoolInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutUserInput = {
  create: PostCreateWithoutUserInput;
  where: PostWhereUniqueInput;
};

export type PostCreateWithoutCommentsInput = {
  caption: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<PostCreateimagesInput>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutPostInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutPostInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutPostInput>;
  school?: InputMaybe<SchoolCreateNestedOneWithoutPostsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutPostsInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<PostCreatevideosInput>;
  videosAspectRatio?: InputMaybe<PostCreatevideosAspectRatioInput>;
  visibility?: InputMaybe<Visibility>;
};

export type PostCreateWithoutPostFlagInput = {
  caption: Scalars['String']['input'];
  comments?: InputMaybe<CommentCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<PostCreateimagesInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutPostInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutPostInput>;
  school?: InputMaybe<SchoolCreateNestedOneWithoutPostsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutPostsInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<PostCreatevideosInput>;
  videosAspectRatio?: InputMaybe<PostCreatevideosAspectRatioInput>;
  visibility?: InputMaybe<Visibility>;
};

export type PostCreateWithoutPostLikesInput = {
  caption: Scalars['String']['input'];
  comments?: InputMaybe<CommentCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<PostCreateimagesInput>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutPostInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutPostInput>;
  school?: InputMaybe<SchoolCreateNestedOneWithoutPostsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutPostsInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<PostCreatevideosInput>;
  videosAspectRatio?: InputMaybe<PostCreatevideosAspectRatioInput>;
  visibility?: InputMaybe<Visibility>;
};

export type PostCreateWithoutPostReportsInput = {
  caption: Scalars['String']['input'];
  comments?: InputMaybe<CommentCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<PostCreateimagesInput>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutPostInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutPostInput>;
  school?: InputMaybe<SchoolCreateNestedOneWithoutPostsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutPostsInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<PostCreatevideosInput>;
  videosAspectRatio?: InputMaybe<PostCreatevideosAspectRatioInput>;
  visibility?: InputMaybe<Visibility>;
};

export type PostCreateWithoutSchoolInput = {
  caption: Scalars['String']['input'];
  comments?: InputMaybe<CommentCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<PostCreateimagesInput>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutPostInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutPostInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutPostInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutPostsInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<PostCreatevideosInput>;
  videosAspectRatio?: InputMaybe<PostCreatevideosAspectRatioInput>;
  visibility?: InputMaybe<Visibility>;
};

export type PostCreateWithoutUserInput = {
  caption: Scalars['String']['input'];
  comments?: InputMaybe<CommentCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  images?: InputMaybe<PostCreateimagesInput>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutPostInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutPostInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutPostInput>;
  school?: InputMaybe<SchoolCreateNestedOneWithoutPostsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<PostCreatevideosInput>;
  videosAspectRatio?: InputMaybe<PostCreatevideosAspectRatioInput>;
  visibility?: InputMaybe<Visibility>;
};

export type PostCreateimagesInput = {
  set: Array<Scalars['String']['input']>;
};

export type PostCreatevideosAspectRatioInput = {
  set: Array<Scalars['String']['input']>;
};

export type PostCreatevideosInput = {
  set: Array<Scalars['String']['input']>;
};

export type PostFlag = {
  __typename?: 'PostFlag';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  post: Post;
  postId: Scalars['BigInt']['output'];
  reason: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
};

export type PostFlagAvgAggregate = {
  __typename?: 'PostFlagAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  postId?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type PostFlagAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type PostFlagCountAggregate = {
  __typename?: 'PostFlagCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  postId: Scalars['Int']['output'];
  reason: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type PostFlagCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  reason?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PostFlagCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  post: PostCreateNestedOneWithoutPostFlagInput;
  reason: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutPostFlagInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostFlagCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  postId: Scalars['BigInt']['input'];
  reason: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostFlagCreateManyPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  reason: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostFlagCreateManyPostInputEnvelope = {
  data: Array<PostFlagCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PostFlagCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  postId: Scalars['BigInt']['input'];
  reason: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostFlagCreateManyUserInputEnvelope = {
  data: Array<PostFlagCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PostFlagCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<PostFlagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostFlagCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<PostFlagCreateWithoutPostInput>>;
  createMany?: InputMaybe<PostFlagCreateManyPostInputEnvelope>;
};

export type PostFlagCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<PostFlagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostFlagCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<PostFlagCreateWithoutUserInput>>;
  createMany?: InputMaybe<PostFlagCreateManyUserInputEnvelope>;
};

export type PostFlagCreateOrConnectWithoutPostInput = {
  create: PostFlagCreateWithoutPostInput;
  where: PostFlagWhereUniqueInput;
};

export type PostFlagCreateOrConnectWithoutUserInput = {
  create: PostFlagCreateWithoutUserInput;
  where: PostFlagWhereUniqueInput;
};

export type PostFlagCreateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  reason: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutPostFlagInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostFlagCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  post: PostCreateNestedOneWithoutPostFlagInput;
  reason: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostFlagGroupBy = {
  __typename?: 'PostFlagGroupBy';
  _avg?: Maybe<PostFlagAvgAggregate>;
  _count?: Maybe<PostFlagCountAggregate>;
  _max?: Maybe<PostFlagMaxAggregate>;
  _min?: Maybe<PostFlagMinAggregate>;
  _sum?: Maybe<PostFlagSumAggregate>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  postId: Scalars['BigInt']['output'];
  reason: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
};

export type PostFlagListRelationFilter = {
  every?: InputMaybe<PostFlagWhereInput>;
  none?: InputMaybe<PostFlagWhereInput>;
  some?: InputMaybe<PostFlagWhereInput>;
};

export type PostFlagMaxAggregate = {
  __typename?: 'PostFlagMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  postId?: Maybe<Scalars['BigInt']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type PostFlagMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  reason?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PostFlagMinAggregate = {
  __typename?: 'PostFlagMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  postId?: Maybe<Scalars['BigInt']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type PostFlagMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  reason?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PostFlagOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PostFlagOrderByWithAggregationInput = {
  _avg?: InputMaybe<PostFlagAvgOrderByAggregateInput>;
  _count?: InputMaybe<PostFlagCountOrderByAggregateInput>;
  _max?: InputMaybe<PostFlagMaxOrderByAggregateInput>;
  _min?: InputMaybe<PostFlagMinOrderByAggregateInput>;
  _sum?: InputMaybe<PostFlagSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  reason?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PostFlagOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  post?: InputMaybe<PostOrderByWithRelationInput>;
  postId?: InputMaybe<SortOrder>;
  reason?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export enum PostFlagScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  PostId = 'postId',
  Reason = 'reason',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  Uuid = 'uuid'
}

export type PostFlagScalarWhereInput = {
  AND?: InputMaybe<Array<PostFlagScalarWhereInput>>;
  NOT?: InputMaybe<Array<PostFlagScalarWhereInput>>;
  OR?: InputMaybe<Array<PostFlagScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  reason?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type PostFlagScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PostFlagScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<PostFlagScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PostFlagScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  postId?: InputMaybe<BigIntWithAggregatesFilter>;
  reason?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<BigIntWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
};

export type PostFlagSumAggregate = {
  __typename?: 'PostFlagSumAggregate';
  id?: Maybe<Scalars['BigInt']['output']>;
  postId?: Maybe<Scalars['BigInt']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type PostFlagSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type PostFlagUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutPostFlagNestedInput>;
  reason?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostFlagNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PostFlagUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  reason?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PostFlagUpdateManyWithWhereWithoutPostInput = {
  data: PostFlagUpdateManyMutationInput;
  where: PostFlagScalarWhereInput;
};

export type PostFlagUpdateManyWithWhereWithoutUserInput = {
  data: PostFlagUpdateManyMutationInput;
  where: PostFlagScalarWhereInput;
};

export type PostFlagUpdateManyWithoutPostNestedInput = {
  connect?: InputMaybe<Array<PostFlagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostFlagCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<PostFlagCreateWithoutPostInput>>;
  createMany?: InputMaybe<PostFlagCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<PostFlagWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PostFlagScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PostFlagWhereUniqueInput>>;
  set?: InputMaybe<Array<PostFlagWhereUniqueInput>>;
  update?: InputMaybe<Array<PostFlagUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<PostFlagUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<PostFlagUpsertWithWhereUniqueWithoutPostInput>>;
};

export type PostFlagUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<PostFlagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostFlagCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<PostFlagCreateWithoutUserInput>>;
  createMany?: InputMaybe<PostFlagCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<PostFlagWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PostFlagScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PostFlagWhereUniqueInput>>;
  set?: InputMaybe<Array<PostFlagWhereUniqueInput>>;
  update?: InputMaybe<Array<PostFlagUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<PostFlagUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<PostFlagUpsertWithWhereUniqueWithoutUserInput>>;
};

export type PostFlagUpdateWithWhereUniqueWithoutPostInput = {
  data: PostFlagUpdateWithoutPostInput;
  where: PostFlagWhereUniqueInput;
};

export type PostFlagUpdateWithWhereUniqueWithoutUserInput = {
  data: PostFlagUpdateWithoutUserInput;
  where: PostFlagWhereUniqueInput;
};

export type PostFlagUpdateWithoutPostInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  reason?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostFlagNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PostFlagUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutPostFlagNestedInput>;
  reason?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PostFlagUpsertWithWhereUniqueWithoutPostInput = {
  create: PostFlagCreateWithoutPostInput;
  update: PostFlagUpdateWithoutPostInput;
  where: PostFlagWhereUniqueInput;
};

export type PostFlagUpsertWithWhereUniqueWithoutUserInput = {
  create: PostFlagCreateWithoutUserInput;
  update: PostFlagUpdateWithoutUserInput;
  where: PostFlagWhereUniqueInput;
};

export type PostFlagWhereInput = {
  AND?: InputMaybe<Array<PostFlagWhereInput>>;
  NOT?: InputMaybe<Array<PostFlagWhereInput>>;
  OR?: InputMaybe<Array<PostFlagWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  post?: InputMaybe<PostRelationFilter>;
  postId?: InputMaybe<BigIntFilter>;
  reason?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type PostFlagWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostGroupBy = {
  __typename?: 'PostGroupBy';
  _avg?: Maybe<PostAvgAggregate>;
  _count?: Maybe<PostCountAggregate>;
  _max?: Maybe<PostMaxAggregate>;
  _min?: Maybe<PostMinAggregate>;
  _sum?: Maybe<PostSumAggregate>;
  caption: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
  videos?: Maybe<Array<Scalars['String']['output']>>;
  videosAspectRatio?: Maybe<Array<Scalars['String']['output']>>;
  visibility: Visibility;
};

export type PostLike = {
  __typename?: 'PostLike';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  post: Post;
  postId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
};

export type PostLikeAvgAggregate = {
  __typename?: 'PostLikeAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  postId?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type PostLikeAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type PostLikeCountAggregate = {
  __typename?: 'PostLikeCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  postId: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type PostLikeCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PostLikeCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  post: PostCreateNestedOneWithoutPostLikesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutPostLikesInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostLikeCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  postId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostLikeCreateManyPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostLikeCreateManyPostInputEnvelope = {
  data: Array<PostLikeCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PostLikeCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  postId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostLikeCreateManyUserInputEnvelope = {
  data: Array<PostLikeCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PostLikeCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<PostLikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostLikeCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<PostLikeCreateWithoutPostInput>>;
  createMany?: InputMaybe<PostLikeCreateManyPostInputEnvelope>;
};

export type PostLikeCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<PostLikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostLikeCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<PostLikeCreateWithoutUserInput>>;
  createMany?: InputMaybe<PostLikeCreateManyUserInputEnvelope>;
};

export type PostLikeCreateOrConnectWithoutPostInput = {
  create: PostLikeCreateWithoutPostInput;
  where: PostLikeWhereUniqueInput;
};

export type PostLikeCreateOrConnectWithoutUserInput = {
  create: PostLikeCreateWithoutUserInput;
  where: PostLikeWhereUniqueInput;
};

export type PostLikeCreateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutPostLikesInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostLikeCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  post: PostCreateNestedOneWithoutPostLikesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostLikeGroupBy = {
  __typename?: 'PostLikeGroupBy';
  _avg?: Maybe<PostLikeAvgAggregate>;
  _count?: Maybe<PostLikeCountAggregate>;
  _max?: Maybe<PostLikeMaxAggregate>;
  _min?: Maybe<PostLikeMinAggregate>;
  _sum?: Maybe<PostLikeSumAggregate>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  postId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
};

export type PostLikeListRelationFilter = {
  every?: InputMaybe<PostLikeWhereInput>;
  none?: InputMaybe<PostLikeWhereInput>;
  some?: InputMaybe<PostLikeWhereInput>;
};

export type PostLikeMaxAggregate = {
  __typename?: 'PostLikeMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  postId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type PostLikeMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PostLikeMinAggregate = {
  __typename?: 'PostLikeMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  postId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type PostLikeMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PostLikeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PostLikeOrderByWithAggregationInput = {
  _avg?: InputMaybe<PostLikeAvgOrderByAggregateInput>;
  _count?: InputMaybe<PostLikeCountOrderByAggregateInput>;
  _max?: InputMaybe<PostLikeMaxOrderByAggregateInput>;
  _min?: InputMaybe<PostLikeMinOrderByAggregateInput>;
  _sum?: InputMaybe<PostLikeSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type PostLikeOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  post?: InputMaybe<PostOrderByWithRelationInput>;
  postId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export enum PostLikeScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  PostId = 'postId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  Uuid = 'uuid'
}

export type PostLikeScalarWhereInput = {
  AND?: InputMaybe<Array<PostLikeScalarWhereInput>>;
  NOT?: InputMaybe<Array<PostLikeScalarWhereInput>>;
  OR?: InputMaybe<Array<PostLikeScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type PostLikeScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PostLikeScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<PostLikeScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PostLikeScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  postId?: InputMaybe<BigIntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<BigIntWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
};

export type PostLikeSumAggregate = {
  __typename?: 'PostLikeSumAggregate';
  id?: Maybe<Scalars['BigInt']['output']>;
  postId?: Maybe<Scalars['BigInt']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type PostLikeSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type PostLikeUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutPostLikesNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostLikesNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PostLikeUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PostLikeUpdateManyWithWhereWithoutPostInput = {
  data: PostLikeUpdateManyMutationInput;
  where: PostLikeScalarWhereInput;
};

export type PostLikeUpdateManyWithWhereWithoutUserInput = {
  data: PostLikeUpdateManyMutationInput;
  where: PostLikeScalarWhereInput;
};

export type PostLikeUpdateManyWithoutPostNestedInput = {
  connect?: InputMaybe<Array<PostLikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostLikeCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<PostLikeCreateWithoutPostInput>>;
  createMany?: InputMaybe<PostLikeCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<PostLikeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PostLikeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PostLikeWhereUniqueInput>>;
  set?: InputMaybe<Array<PostLikeWhereUniqueInput>>;
  update?: InputMaybe<Array<PostLikeUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<PostLikeUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<PostLikeUpsertWithWhereUniqueWithoutPostInput>>;
};

export type PostLikeUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<PostLikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostLikeCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<PostLikeCreateWithoutUserInput>>;
  createMany?: InputMaybe<PostLikeCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<PostLikeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PostLikeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PostLikeWhereUniqueInput>>;
  set?: InputMaybe<Array<PostLikeWhereUniqueInput>>;
  update?: InputMaybe<Array<PostLikeUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<PostLikeUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<PostLikeUpsertWithWhereUniqueWithoutUserInput>>;
};

export type PostLikeUpdateWithWhereUniqueWithoutPostInput = {
  data: PostLikeUpdateWithoutPostInput;
  where: PostLikeWhereUniqueInput;
};

export type PostLikeUpdateWithWhereUniqueWithoutUserInput = {
  data: PostLikeUpdateWithoutUserInput;
  where: PostLikeWhereUniqueInput;
};

export type PostLikeUpdateWithoutPostInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostLikesNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PostLikeUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutPostLikesNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PostLikeUpsertWithWhereUniqueWithoutPostInput = {
  create: PostLikeCreateWithoutPostInput;
  update: PostLikeUpdateWithoutPostInput;
  where: PostLikeWhereUniqueInput;
};

export type PostLikeUpsertWithWhereUniqueWithoutUserInput = {
  create: PostLikeCreateWithoutUserInput;
  update: PostLikeUpdateWithoutUserInput;
  where: PostLikeWhereUniqueInput;
};

export type PostLikeWhereInput = {
  AND?: InputMaybe<Array<PostLikeWhereInput>>;
  NOT?: InputMaybe<Array<PostLikeWhereInput>>;
  OR?: InputMaybe<Array<PostLikeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  post?: InputMaybe<PostRelationFilter>;
  postId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type PostLikeWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostListRelationFilter = {
  every?: InputMaybe<PostWhereInput>;
  none?: InputMaybe<PostWhereInput>;
  some?: InputMaybe<PostWhereInput>;
};

export type PostMaxAggregate = {
  __typename?: 'PostMaxAggregate';
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  visibility?: Maybe<Visibility>;
};

export type PostMaxOrderByAggregateInput = {
  caption?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  visibility?: InputMaybe<SortOrder>;
};

export type PostMinAggregate = {
  __typename?: 'PostMinAggregate';
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  visibility?: Maybe<Visibility>;
};

export type PostMinOrderByAggregateInput = {
  caption?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  visibility?: InputMaybe<SortOrder>;
};

export type PostOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PostOrderByWithAggregationInput = {
  _avg?: InputMaybe<PostAvgOrderByAggregateInput>;
  _count?: InputMaybe<PostCountOrderByAggregateInput>;
  _max?: InputMaybe<PostMaxOrderByAggregateInput>;
  _min?: InputMaybe<PostMinOrderByAggregateInput>;
  _sum?: InputMaybe<PostSumOrderByAggregateInput>;
  caption?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  videos?: InputMaybe<SortOrder>;
  videosAspectRatio?: InputMaybe<SortOrder>;
  visibility?: InputMaybe<SortOrder>;
};

export type PostOrderByWithRelationInput = {
  caption?: InputMaybe<SortOrder>;
  comments?: InputMaybe<CommentOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<SortOrder>;
  postFlag?: InputMaybe<PostFlagOrderByRelationAggregateInput>;
  postLikes?: InputMaybe<PostLikeOrderByRelationAggregateInput>;
  postReports?: InputMaybe<PostReportOrderByRelationAggregateInput>;
  school?: InputMaybe<SchoolOrderByWithRelationInput>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  videos?: InputMaybe<SortOrder>;
  videosAspectRatio?: InputMaybe<SortOrder>;
  visibility?: InputMaybe<SortOrder>;
};

export type PostRelationFilter = {
  is?: InputMaybe<PostWhereInput>;
  isNot?: InputMaybe<PostWhereInput>;
};

export type PostReport = {
  __typename?: 'PostReport';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  postId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['BigInt']['output'];
  uuid: Scalars['String']['output'];
};

export type PostReportCreateManyPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['BigInt']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostReportCreateManyPostInputEnvelope = {
  data: Array<PostReportCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PostReportCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  postId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostReportCreateManyUserInputEnvelope = {
  data: Array<PostReportCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PostReportCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<PostReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostReportCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<PostReportCreateWithoutPostInput>>;
  createMany?: InputMaybe<PostReportCreateManyPostInputEnvelope>;
};

export type PostReportCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<PostReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostReportCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<PostReportCreateWithoutUserInput>>;
  createMany?: InputMaybe<PostReportCreateManyUserInputEnvelope>;
};

export type PostReportCreateOrConnectWithoutPostInput = {
  create: PostReportCreateWithoutPostInput;
  where: PostReportWhereUniqueInput;
};

export type PostReportCreateOrConnectWithoutUserInput = {
  create: PostReportCreateWithoutUserInput;
  where: PostReportWhereUniqueInput;
};

export type PostReportCreateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutPostReportsInput;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostReportCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  post: PostCreateNestedOneWithoutPostReportsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PostReportListRelationFilter = {
  every?: InputMaybe<PostReportWhereInput>;
  none?: InputMaybe<PostReportWhereInput>;
  some?: InputMaybe<PostReportWhereInput>;
};

export type PostReportOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PostReportOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  post?: InputMaybe<PostOrderByWithRelationInput>;
  postId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export enum PostReportScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  PostId = 'postId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  Uuid = 'uuid'
}

export type PostReportScalarWhereInput = {
  AND?: InputMaybe<Array<PostReportScalarWhereInput>>;
  NOT?: InputMaybe<Array<PostReportScalarWhereInput>>;
  OR?: InputMaybe<Array<PostReportScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type PostReportUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PostReportUpdateManyWithWhereWithoutPostInput = {
  data: PostReportUpdateManyMutationInput;
  where: PostReportScalarWhereInput;
};

export type PostReportUpdateManyWithWhereWithoutUserInput = {
  data: PostReportUpdateManyMutationInput;
  where: PostReportScalarWhereInput;
};

export type PostReportUpdateManyWithoutPostNestedInput = {
  connect?: InputMaybe<Array<PostReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostReportCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<PostReportCreateWithoutPostInput>>;
  createMany?: InputMaybe<PostReportCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<PostReportWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PostReportScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PostReportWhereUniqueInput>>;
  set?: InputMaybe<Array<PostReportWhereUniqueInput>>;
  update?: InputMaybe<Array<PostReportUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<PostReportUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<PostReportUpsertWithWhereUniqueWithoutPostInput>>;
};

export type PostReportUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<PostReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostReportCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<PostReportCreateWithoutUserInput>>;
  createMany?: InputMaybe<PostReportCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<PostReportWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PostReportScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PostReportWhereUniqueInput>>;
  set?: InputMaybe<Array<PostReportWhereUniqueInput>>;
  update?: InputMaybe<Array<PostReportUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<PostReportUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<PostReportUpsertWithWhereUniqueWithoutUserInput>>;
};

export type PostReportUpdateWithWhereUniqueWithoutPostInput = {
  data: PostReportUpdateWithoutPostInput;
  where: PostReportWhereUniqueInput;
};

export type PostReportUpdateWithWhereUniqueWithoutUserInput = {
  data: PostReportUpdateWithoutUserInput;
  where: PostReportWhereUniqueInput;
};

export type PostReportUpdateWithoutPostInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostReportsNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PostReportUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutPostReportsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PostReportUpsertWithWhereUniqueWithoutPostInput = {
  create: PostReportCreateWithoutPostInput;
  update: PostReportUpdateWithoutPostInput;
  where: PostReportWhereUniqueInput;
};

export type PostReportUpsertWithWhereUniqueWithoutUserInput = {
  create: PostReportCreateWithoutUserInput;
  update: PostReportUpdateWithoutUserInput;
  where: PostReportWhereUniqueInput;
};

export type PostReportWhereInput = {
  AND?: InputMaybe<Array<PostReportWhereInput>>;
  NOT?: InputMaybe<Array<PostReportWhereInput>>;
  OR?: InputMaybe<Array<PostReportWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  post?: InputMaybe<PostRelationFilter>;
  postId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type PostReportWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export enum PostScalarFieldEnum {
  Caption = 'caption',
  CreatedAt = 'createdAt',
  Id = 'id',
  Images = 'images',
  SchoolId = 'schoolId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  Uuid = 'uuid',
  Videos = 'videos',
  VideosAspectRatio = 'videosAspectRatio',
  Visibility = 'visibility'
}

export type PostScalarWhereInput = {
  AND?: InputMaybe<Array<PostScalarWhereInput>>;
  NOT?: InputMaybe<Array<PostScalarWhereInput>>;
  OR?: InputMaybe<Array<PostScalarWhereInput>>;
  caption?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  images?: InputMaybe<StringNullableListFilter>;
  schoolId?: InputMaybe<BigIntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
  videos?: InputMaybe<StringNullableListFilter>;
  videosAspectRatio?: InputMaybe<StringNullableListFilter>;
  visibility?: InputMaybe<EnumVisibilityFilter>;
};

export type PostScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PostScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<PostScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PostScalarWhereWithAggregatesInput>>;
  caption?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  images?: InputMaybe<StringNullableListFilter>;
  schoolId?: InputMaybe<BigIntNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<BigIntWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
  videos?: InputMaybe<StringNullableListFilter>;
  videosAspectRatio?: InputMaybe<StringNullableListFilter>;
  visibility?: InputMaybe<EnumVisibilityWithAggregatesFilter>;
};

export type PostSumAggregate = {
  __typename?: 'PostSumAggregate';
  id?: Maybe<Scalars['BigInt']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type PostSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type PostUpdateInput = {
  caption?: InputMaybe<StringFieldUpdateOperationsInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  images?: InputMaybe<PostUpdateimagesInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutPostNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutPostNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutPostNestedInput>;
  school?: InputMaybe<SchoolUpdateOneWithoutPostsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  videos?: InputMaybe<PostUpdatevideosInput>;
  videosAspectRatio?: InputMaybe<PostUpdatevideosAspectRatioInput>;
  visibility?: InputMaybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type PostUpdateManyMutationInput = {
  caption?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  images?: InputMaybe<PostUpdateimagesInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  videos?: InputMaybe<PostUpdatevideosInput>;
  videosAspectRatio?: InputMaybe<PostUpdatevideosAspectRatioInput>;
  visibility?: InputMaybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type PostUpdateManyWithWhereWithoutSchoolInput = {
  data: PostUpdateManyMutationInput;
  where: PostScalarWhereInput;
};

export type PostUpdateManyWithWhereWithoutUserInput = {
  data: PostUpdateManyMutationInput;
  where: PostScalarWhereInput;
};

export type PostUpdateManyWithoutSchoolNestedInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<PostCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<PostCreateManySchoolInputEnvelope>;
  delete?: InputMaybe<Array<PostWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PostScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PostWhereUniqueInput>>;
  set?: InputMaybe<Array<PostWhereUniqueInput>>;
  update?: InputMaybe<Array<PostUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: InputMaybe<Array<PostUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: InputMaybe<Array<PostUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type PostUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<PostCreateWithoutUserInput>>;
  createMany?: InputMaybe<PostCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<PostWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PostScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PostWhereUniqueInput>>;
  set?: InputMaybe<Array<PostWhereUniqueInput>>;
  update?: InputMaybe<Array<PostUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<PostUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<PostUpsertWithWhereUniqueWithoutUserInput>>;
};

export type PostUpdateOneRequiredWithoutCommentsNestedInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<PostCreateWithoutCommentsInput>;
  update?: InputMaybe<PostUpdateWithoutCommentsInput>;
  upsert?: InputMaybe<PostUpsertWithoutCommentsInput>;
};

export type PostUpdateOneRequiredWithoutPostFlagNestedInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutPostFlagInput>;
  create?: InputMaybe<PostCreateWithoutPostFlagInput>;
  update?: InputMaybe<PostUpdateWithoutPostFlagInput>;
  upsert?: InputMaybe<PostUpsertWithoutPostFlagInput>;
};

export type PostUpdateOneRequiredWithoutPostLikesNestedInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutPostLikesInput>;
  create?: InputMaybe<PostCreateWithoutPostLikesInput>;
  update?: InputMaybe<PostUpdateWithoutPostLikesInput>;
  upsert?: InputMaybe<PostUpsertWithoutPostLikesInput>;
};

export type PostUpdateOneRequiredWithoutPostReportsNestedInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutPostReportsInput>;
  create?: InputMaybe<PostCreateWithoutPostReportsInput>;
  update?: InputMaybe<PostUpdateWithoutPostReportsInput>;
  upsert?: InputMaybe<PostUpsertWithoutPostReportsInput>;
};

export type PostUpdateWithWhereUniqueWithoutSchoolInput = {
  data: PostUpdateWithoutSchoolInput;
  where: PostWhereUniqueInput;
};

export type PostUpdateWithWhereUniqueWithoutUserInput = {
  data: PostUpdateWithoutUserInput;
  where: PostWhereUniqueInput;
};

export type PostUpdateWithoutCommentsInput = {
  caption?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  images?: InputMaybe<PostUpdateimagesInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutPostNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutPostNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutPostNestedInput>;
  school?: InputMaybe<SchoolUpdateOneWithoutPostsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  videos?: InputMaybe<PostUpdatevideosInput>;
  videosAspectRatio?: InputMaybe<PostUpdatevideosAspectRatioInput>;
  visibility?: InputMaybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type PostUpdateWithoutPostFlagInput = {
  caption?: InputMaybe<StringFieldUpdateOperationsInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  images?: InputMaybe<PostUpdateimagesInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutPostNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutPostNestedInput>;
  school?: InputMaybe<SchoolUpdateOneWithoutPostsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  videos?: InputMaybe<PostUpdatevideosInput>;
  videosAspectRatio?: InputMaybe<PostUpdatevideosAspectRatioInput>;
  visibility?: InputMaybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type PostUpdateWithoutPostLikesInput = {
  caption?: InputMaybe<StringFieldUpdateOperationsInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  images?: InputMaybe<PostUpdateimagesInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutPostNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutPostNestedInput>;
  school?: InputMaybe<SchoolUpdateOneWithoutPostsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  videos?: InputMaybe<PostUpdatevideosInput>;
  videosAspectRatio?: InputMaybe<PostUpdatevideosAspectRatioInput>;
  visibility?: InputMaybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type PostUpdateWithoutPostReportsInput = {
  caption?: InputMaybe<StringFieldUpdateOperationsInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  images?: InputMaybe<PostUpdateimagesInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutPostNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutPostNestedInput>;
  school?: InputMaybe<SchoolUpdateOneWithoutPostsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  videos?: InputMaybe<PostUpdatevideosInput>;
  videosAspectRatio?: InputMaybe<PostUpdatevideosAspectRatioInput>;
  visibility?: InputMaybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type PostUpdateWithoutSchoolInput = {
  caption?: InputMaybe<StringFieldUpdateOperationsInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  images?: InputMaybe<PostUpdateimagesInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutPostNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutPostNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutPostNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  videos?: InputMaybe<PostUpdatevideosInput>;
  videosAspectRatio?: InputMaybe<PostUpdatevideosAspectRatioInput>;
  visibility?: InputMaybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type PostUpdateWithoutUserInput = {
  caption?: InputMaybe<StringFieldUpdateOperationsInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  images?: InputMaybe<PostUpdateimagesInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutPostNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutPostNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutPostNestedInput>;
  school?: InputMaybe<SchoolUpdateOneWithoutPostsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  videos?: InputMaybe<PostUpdatevideosInput>;
  videosAspectRatio?: InputMaybe<PostUpdatevideosAspectRatioInput>;
  visibility?: InputMaybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type PostUpdateimagesInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PostUpdatevideosAspectRatioInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PostUpdatevideosInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PostUpsertWithWhereUniqueWithoutSchoolInput = {
  create: PostCreateWithoutSchoolInput;
  update: PostUpdateWithoutSchoolInput;
  where: PostWhereUniqueInput;
};

export type PostUpsertWithWhereUniqueWithoutUserInput = {
  create: PostCreateWithoutUserInput;
  update: PostUpdateWithoutUserInput;
  where: PostWhereUniqueInput;
};

export type PostUpsertWithoutCommentsInput = {
  create: PostCreateWithoutCommentsInput;
  update: PostUpdateWithoutCommentsInput;
};

export type PostUpsertWithoutPostFlagInput = {
  create: PostCreateWithoutPostFlagInput;
  update: PostUpdateWithoutPostFlagInput;
};

export type PostUpsertWithoutPostLikesInput = {
  create: PostCreateWithoutPostLikesInput;
  update: PostUpdateWithoutPostLikesInput;
};

export type PostUpsertWithoutPostReportsInput = {
  create: PostCreateWithoutPostReportsInput;
  update: PostUpdateWithoutPostReportsInput;
};

export type PostWhereInput = {
  AND?: InputMaybe<Array<PostWhereInput>>;
  NOT?: InputMaybe<Array<PostWhereInput>>;
  OR?: InputMaybe<Array<PostWhereInput>>;
  caption?: InputMaybe<StringFilter>;
  comments?: InputMaybe<CommentListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  images?: InputMaybe<StringNullableListFilter>;
  postFlag?: InputMaybe<PostFlagListRelationFilter>;
  postLikes?: InputMaybe<PostLikeListRelationFilter>;
  postReports?: InputMaybe<PostReportListRelationFilter>;
  school?: InputMaybe<SchoolRelationFilter>;
  schoolId?: InputMaybe<BigIntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<BigIntFilter>;
  uuid?: InputMaybe<StringFilter>;
  videos?: InputMaybe<StringNullableListFilter>;
  videosAspectRatio?: InputMaybe<StringNullableListFilter>;
  visibility?: InputMaybe<EnumVisibilityFilter>;
};

export type PostWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type ProcessVideoInput = {
  filePath: Scalars['String']['input'];
};

export type ProspectedAthlete = {
  __typename?: 'ProspectedAthlete';
  User?: Maybe<User>;
  athlete: AthleteProfile;
  athleteId: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  school: School;
  schoolId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type ProspectedAthleteAthleteIdSchoolIdCompoundUniqueInput = {
  athleteId: Scalars['BigInt']['input'];
  schoolId: Scalars['BigInt']['input'];
};

export type ProspectedAthleteAvgAggregate = {
  __typename?: 'ProspectedAthleteAvgAggregate';
  athleteId?: Maybe<Scalars['Float']['output']>;
  schoolId?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type ProspectedAthleteAvgOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type ProspectedAthleteCountAggregate = {
  __typename?: 'ProspectedAthleteCountAggregate';
  _all: Scalars['Int']['output'];
  athleteId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  schoolId: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type ProspectedAthleteCountOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type ProspectedAthleteCreateInput = {
  User?: InputMaybe<UserCreateNestedOneWithoutProspectedSchoolsInput>;
  athlete: AthleteProfileCreateNestedOneWithoutProspectedSchoolsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesProspectedInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProspectedAthleteCreateManyAthleteInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type ProspectedAthleteCreateManyAthleteInputEnvelope = {
  data: Array<ProspectedAthleteCreateManyAthleteInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProspectedAthleteCreateManyInput = {
  athleteId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type ProspectedAthleteCreateManySchoolInput = {
  athleteId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type ProspectedAthleteCreateManySchoolInputEnvelope = {
  data: Array<ProspectedAthleteCreateManySchoolInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProspectedAthleteCreateManyUserInput = {
  athleteId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProspectedAthleteCreateManyUserInputEnvelope = {
  data: Array<ProspectedAthleteCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProspectedAthleteCreateNestedManyWithoutAthleteInput = {
  connect?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProspectedAthleteCreateOrConnectWithoutAthleteInput>>;
  create?: InputMaybe<Array<ProspectedAthleteCreateWithoutAthleteInput>>;
  createMany?: InputMaybe<ProspectedAthleteCreateManyAthleteInputEnvelope>;
};

export type ProspectedAthleteCreateNestedManyWithoutSchoolInput = {
  connect?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProspectedAthleteCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<ProspectedAthleteCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<ProspectedAthleteCreateManySchoolInputEnvelope>;
};

export type ProspectedAthleteCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProspectedAthleteCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ProspectedAthleteCreateWithoutUserInput>>;
  createMany?: InputMaybe<ProspectedAthleteCreateManyUserInputEnvelope>;
};

export type ProspectedAthleteCreateOrConnectWithoutAthleteInput = {
  create: ProspectedAthleteCreateWithoutAthleteInput;
  where: ProspectedAthleteWhereUniqueInput;
};

export type ProspectedAthleteCreateOrConnectWithoutSchoolInput = {
  create: ProspectedAthleteCreateWithoutSchoolInput;
  where: ProspectedAthleteWhereUniqueInput;
};

export type ProspectedAthleteCreateOrConnectWithoutUserInput = {
  create: ProspectedAthleteCreateWithoutUserInput;
  where: ProspectedAthleteWhereUniqueInput;
};

export type ProspectedAthleteCreateWithoutAthleteInput = {
  User?: InputMaybe<UserCreateNestedOneWithoutProspectedSchoolsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesProspectedInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProspectedAthleteCreateWithoutSchoolInput = {
  User?: InputMaybe<UserCreateNestedOneWithoutProspectedSchoolsInput>;
  athlete: AthleteProfileCreateNestedOneWithoutProspectedSchoolsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProspectedAthleteCreateWithoutUserInput = {
  athlete: AthleteProfileCreateNestedOneWithoutProspectedSchoolsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesProspectedInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProspectedAthleteGroupBy = {
  __typename?: 'ProspectedAthleteGroupBy';
  _avg?: Maybe<ProspectedAthleteAvgAggregate>;
  _count?: Maybe<ProspectedAthleteCountAggregate>;
  _max?: Maybe<ProspectedAthleteMaxAggregate>;
  _min?: Maybe<ProspectedAthleteMinAggregate>;
  _sum?: Maybe<ProspectedAthleteSumAggregate>;
  athleteId: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  schoolId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type ProspectedAthleteListRelationFilter = {
  every?: InputMaybe<ProspectedAthleteWhereInput>;
  none?: InputMaybe<ProspectedAthleteWhereInput>;
  some?: InputMaybe<ProspectedAthleteWhereInput>;
};

export type ProspectedAthleteMaxAggregate = {
  __typename?: 'ProspectedAthleteMaxAggregate';
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type ProspectedAthleteMaxOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type ProspectedAthleteMinAggregate = {
  __typename?: 'ProspectedAthleteMinAggregate';
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type ProspectedAthleteMinOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type ProspectedAthleteOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ProspectedAthleteOrderByWithAggregationInput = {
  _avg?: InputMaybe<ProspectedAthleteAvgOrderByAggregateInput>;
  _count?: InputMaybe<ProspectedAthleteCountOrderByAggregateInput>;
  _max?: InputMaybe<ProspectedAthleteMaxOrderByAggregateInput>;
  _min?: InputMaybe<ProspectedAthleteMinOrderByAggregateInput>;
  _sum?: InputMaybe<ProspectedAthleteSumOrderByAggregateInput>;
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type ProspectedAthleteOrderByWithRelationInput = {
  User?: InputMaybe<UserOrderByWithRelationInput>;
  athlete?: InputMaybe<AthleteProfileOrderByWithRelationInput>;
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  school?: InputMaybe<SchoolOrderByWithRelationInput>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export enum ProspectedAthleteScalarFieldEnum {
  AthleteId = 'athleteId',
  CreatedAt = 'createdAt',
  SchoolId = 'schoolId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type ProspectedAthleteScalarWhereInput = {
  AND?: InputMaybe<Array<ProspectedAthleteScalarWhereInput>>;
  NOT?: InputMaybe<Array<ProspectedAthleteScalarWhereInput>>;
  OR?: InputMaybe<Array<ProspectedAthleteScalarWhereInput>>;
  athleteId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  schoolId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntNullableFilter>;
};

export type ProspectedAthleteScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ProspectedAthleteScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ProspectedAthleteScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ProspectedAthleteScalarWhereWithAggregatesInput>>;
  athleteId?: InputMaybe<BigIntWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  schoolId?: InputMaybe<BigIntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<BigIntNullableWithAggregatesFilter>;
};

export type ProspectedAthleteSumAggregate = {
  __typename?: 'ProspectedAthleteSumAggregate';
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type ProspectedAthleteSumOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type ProspectedAthleteUpdateInput = {
  User?: InputMaybe<UserUpdateOneWithoutProspectedSchoolsNestedInput>;
  athlete?: InputMaybe<AthleteProfileUpdateOneRequiredWithoutProspectedSchoolsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesProspectedNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ProspectedAthleteUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ProspectedAthleteUpdateManyWithWhereWithoutAthleteInput = {
  data: ProspectedAthleteUpdateManyMutationInput;
  where: ProspectedAthleteScalarWhereInput;
};

export type ProspectedAthleteUpdateManyWithWhereWithoutSchoolInput = {
  data: ProspectedAthleteUpdateManyMutationInput;
  where: ProspectedAthleteScalarWhereInput;
};

export type ProspectedAthleteUpdateManyWithWhereWithoutUserInput = {
  data: ProspectedAthleteUpdateManyMutationInput;
  where: ProspectedAthleteScalarWhereInput;
};

export type ProspectedAthleteUpdateManyWithoutAthleteNestedInput = {
  connect?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProspectedAthleteCreateOrConnectWithoutAthleteInput>>;
  create?: InputMaybe<Array<ProspectedAthleteCreateWithoutAthleteInput>>;
  createMany?: InputMaybe<ProspectedAthleteCreateManyAthleteInputEnvelope>;
  delete?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ProspectedAthleteScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  set?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  update?: InputMaybe<Array<ProspectedAthleteUpdateWithWhereUniqueWithoutAthleteInput>>;
  updateMany?: InputMaybe<Array<ProspectedAthleteUpdateManyWithWhereWithoutAthleteInput>>;
  upsert?: InputMaybe<Array<ProspectedAthleteUpsertWithWhereUniqueWithoutAthleteInput>>;
};

export type ProspectedAthleteUpdateManyWithoutSchoolNestedInput = {
  connect?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProspectedAthleteCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<ProspectedAthleteCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<ProspectedAthleteCreateManySchoolInputEnvelope>;
  delete?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ProspectedAthleteScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  set?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  update?: InputMaybe<Array<ProspectedAthleteUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: InputMaybe<Array<ProspectedAthleteUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: InputMaybe<Array<ProspectedAthleteUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type ProspectedAthleteUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProspectedAthleteCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ProspectedAthleteCreateWithoutUserInput>>;
  createMany?: InputMaybe<ProspectedAthleteCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ProspectedAthleteScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  set?: InputMaybe<Array<ProspectedAthleteWhereUniqueInput>>;
  update?: InputMaybe<Array<ProspectedAthleteUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ProspectedAthleteUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ProspectedAthleteUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ProspectedAthleteUpdateWithWhereUniqueWithoutAthleteInput = {
  data: ProspectedAthleteUpdateWithoutAthleteInput;
  where: ProspectedAthleteWhereUniqueInput;
};

export type ProspectedAthleteUpdateWithWhereUniqueWithoutSchoolInput = {
  data: ProspectedAthleteUpdateWithoutSchoolInput;
  where: ProspectedAthleteWhereUniqueInput;
};

export type ProspectedAthleteUpdateWithWhereUniqueWithoutUserInput = {
  data: ProspectedAthleteUpdateWithoutUserInput;
  where: ProspectedAthleteWhereUniqueInput;
};

export type ProspectedAthleteUpdateWithoutAthleteInput = {
  User?: InputMaybe<UserUpdateOneWithoutProspectedSchoolsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesProspectedNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ProspectedAthleteUpdateWithoutSchoolInput = {
  User?: InputMaybe<UserUpdateOneWithoutProspectedSchoolsNestedInput>;
  athlete?: InputMaybe<AthleteProfileUpdateOneRequiredWithoutProspectedSchoolsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ProspectedAthleteUpdateWithoutUserInput = {
  athlete?: InputMaybe<AthleteProfileUpdateOneRequiredWithoutProspectedSchoolsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesProspectedNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ProspectedAthleteUpsertWithWhereUniqueWithoutAthleteInput = {
  create: ProspectedAthleteCreateWithoutAthleteInput;
  update: ProspectedAthleteUpdateWithoutAthleteInput;
  where: ProspectedAthleteWhereUniqueInput;
};

export type ProspectedAthleteUpsertWithWhereUniqueWithoutSchoolInput = {
  create: ProspectedAthleteCreateWithoutSchoolInput;
  update: ProspectedAthleteUpdateWithoutSchoolInput;
  where: ProspectedAthleteWhereUniqueInput;
};

export type ProspectedAthleteUpsertWithWhereUniqueWithoutUserInput = {
  create: ProspectedAthleteCreateWithoutUserInput;
  update: ProspectedAthleteUpdateWithoutUserInput;
  where: ProspectedAthleteWhereUniqueInput;
};

export type ProspectedAthleteWhereInput = {
  AND?: InputMaybe<Array<ProspectedAthleteWhereInput>>;
  NOT?: InputMaybe<Array<ProspectedAthleteWhereInput>>;
  OR?: InputMaybe<Array<ProspectedAthleteWhereInput>>;
  User?: InputMaybe<UserRelationFilter>;
  athlete?: InputMaybe<AthleteProfileRelationFilter>;
  athleteId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  school?: InputMaybe<SchoolRelationFilter>;
  schoolId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntNullableFilter>;
};

export type ProspectedAthleteWhereUniqueInput = {
  athleteId_schoolId?: InputMaybe<ProspectedAthleteAthleteIdSchoolIdCompoundUniqueInput>;
};

export type Query = {
  __typename?: 'Query';
  accountType?: Maybe<AccountType>;
  accountTypes: Array<AccountType>;
  aggregateAccountType: AggregateAccountType;
  aggregateAthleteProfile: AggregateAthleteProfile;
  aggregateBlocks: AggregateBlocks;
  aggregateCoachProfile: AggregateCoachProfile;
  aggregateComment: AggregateComment;
  aggregateCommentLike: AggregateCommentLike;
  aggregateCountry: AggregateCountry;
  aggregateEvaluation: AggregateEvaluation;
  aggregateFollows: AggregateFollows;
  aggregateInterestedSchools: AggregateInterestedSchools;
  aggregatePosition: AggregatePosition;
  aggregatePositionCategory: AggregatePositionCategory;
  aggregatePost: AggregatePost;
  aggregatePostFlag: AggregatePostFlag;
  aggregatePostLike: AggregatePostLike;
  aggregateProspectedAthlete: AggregateProspectedAthlete;
  aggregateRecruitedAthlete: AggregateRecruitedAthlete;
  aggregateRole: AggregateRole;
  aggregateSchool: AggregateSchool;
  aggregateSchoolType: AggregateSchoolType;
  aggregateSkillType: AggregateSkillType;
  aggregateSkills: AggregateSkills;
  aggregateTranscripts: AggregateTranscripts;
  aggregateUser: AggregateUser;
  athleteProfile?: Maybe<AthleteProfile>;
  athleteProfiles: Array<AthleteProfile>;
  coachProfile?: Maybe<CoachProfile>;
  coachProfiles: Array<CoachProfile>;
  comment?: Maybe<Comment>;
  commentLike?: Maybe<CommentLike>;
  commentLikes: Array<CommentLike>;
  comments: Array<Comment>;
  countries: Array<Country>;
  country?: Maybe<Country>;
  evaluation?: Maybe<Evaluation>;
  evaluations: Array<Evaluation>;
  findFirstAccountType?: Maybe<AccountType>;
  findFirstAthleteProfile?: Maybe<AthleteProfile>;
  findFirstBlocks?: Maybe<Blocks>;
  findFirstCoachProfile?: Maybe<CoachProfile>;
  findFirstComment?: Maybe<Comment>;
  findFirstCommentLike?: Maybe<CommentLike>;
  findFirstCountry?: Maybe<Country>;
  findFirstEvaluation?: Maybe<Evaluation>;
  findFirstFollows?: Maybe<Follows>;
  findFirstInterestedSchools?: Maybe<InterestedSchools>;
  findFirstPosition?: Maybe<Position>;
  findFirstPositionCategory?: Maybe<PositionCategory>;
  findFirstPost?: Maybe<Post>;
  findFirstPostFlag?: Maybe<PostFlag>;
  findFirstPostLike?: Maybe<PostLike>;
  findFirstProspectedAthlete?: Maybe<ProspectedAthlete>;
  findFirstRecruitedAthlete?: Maybe<RecruitedAthlete>;
  findFirstRole?: Maybe<Role>;
  findFirstSchool?: Maybe<School>;
  findFirstSchoolType?: Maybe<SchoolType>;
  findFirstSkillType?: Maybe<SkillType>;
  findFirstSkills?: Maybe<Skills>;
  findFirstTranscripts?: Maybe<Transcripts>;
  findFirstUser?: Maybe<User>;
  findManyBlocks: Array<Blocks>;
  findManyFollows: Array<Follows>;
  findManyInterestedSchools: Array<InterestedSchools>;
  findManySkills: Array<Skills>;
  findManyTranscripts: Array<Transcripts>;
  findUniqueBlocks?: Maybe<Blocks>;
  findUniqueFollows?: Maybe<Follows>;
  findUniqueInterestedSchools?: Maybe<InterestedSchools>;
  findUniqueSkills?: Maybe<Skills>;
  findUniqueTranscripts?: Maybe<Transcripts>;
  groupByAccountType: Array<AccountTypeGroupBy>;
  groupByAthleteProfile: Array<AthleteProfileGroupBy>;
  groupByBlocks: Array<BlocksGroupBy>;
  groupByCoachProfile: Array<CoachProfileGroupBy>;
  groupByComment: Array<CommentGroupBy>;
  groupByCommentLike: Array<CommentLikeGroupBy>;
  groupByCountry: Array<CountryGroupBy>;
  groupByEvaluation: Array<EvaluationGroupBy>;
  groupByFollows: Array<FollowsGroupBy>;
  groupByInterestedSchools: Array<InterestedSchoolsGroupBy>;
  groupByPosition: Array<PositionGroupBy>;
  groupByPositionCategory: Array<PositionCategoryGroupBy>;
  groupByPost: Array<PostGroupBy>;
  groupByPostFlag: Array<PostFlagGroupBy>;
  groupByPostLike: Array<PostLikeGroupBy>;
  groupByProspectedAthlete: Array<ProspectedAthleteGroupBy>;
  groupByRecruitedAthlete: Array<RecruitedAthleteGroupBy>;
  groupByRole: Array<RoleGroupBy>;
  groupBySchool: Array<SchoolGroupBy>;
  groupBySchoolType: Array<SchoolTypeGroupBy>;
  groupBySkillType: Array<SkillTypeGroupBy>;
  groupBySkills: Array<SkillsGroupBy>;
  groupByTranscripts: Array<TranscriptsGroupBy>;
  groupByUser: Array<UserGroupBy>;
  position?: Maybe<Position>;
  positionCategories: Array<PositionCategory>;
  positionCategory?: Maybe<PositionCategory>;
  positions: Array<Position>;
  post?: Maybe<Post>;
  postFlag?: Maybe<PostFlag>;
  postFlags: Array<PostFlag>;
  postLike?: Maybe<PostLike>;
  postLikes: Array<PostLike>;
  posts: Array<Post>;
  prospectedAthlete?: Maybe<ProspectedAthlete>;
  prospectedAthletes: Array<ProspectedAthlete>;
  recruitedAthlete?: Maybe<RecruitedAthlete>;
  recruitedAthletes: Array<RecruitedAthlete>;
  role?: Maybe<Role>;
  roles: Array<Role>;
  school?: Maybe<School>;
  schoolType?: Maybe<SchoolType>;
  schoolTypes: Array<SchoolType>;
  schools: Array<School>;
  skillType?: Maybe<SkillType>;
  skillTypes: Array<SkillType>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryAccountTypeArgs = {
  where: AccountTypeWhereUniqueInput;
};


export type QueryAccountTypesArgs = {
  cursor?: InputMaybe<AccountTypeWhereUniqueInput>;
  distinct?: InputMaybe<Array<AccountTypeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AccountTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountTypeWhereInput>;
};


export type QueryAggregateAccountTypeArgs = {
  cursor?: InputMaybe<AccountTypeWhereUniqueInput>;
  orderBy?: InputMaybe<Array<AccountTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountTypeWhereInput>;
};


export type QueryAggregateAthleteProfileArgs = {
  cursor?: InputMaybe<AthleteProfileWhereUniqueInput>;
  orderBy?: InputMaybe<Array<AthleteProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AthleteProfileWhereInput>;
};


export type QueryAggregateBlocksArgs = {
  cursor?: InputMaybe<BlocksWhereUniqueInput>;
  orderBy?: InputMaybe<Array<BlocksOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BlocksWhereInput>;
};


export type QueryAggregateCoachProfileArgs = {
  cursor?: InputMaybe<CoachProfileWhereUniqueInput>;
  orderBy?: InputMaybe<Array<CoachProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CoachProfileWhereInput>;
};


export type QueryAggregateCommentArgs = {
  cursor?: InputMaybe<CommentWhereUniqueInput>;
  orderBy?: InputMaybe<Array<CommentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentWhereInput>;
};


export type QueryAggregateCommentLikeArgs = {
  cursor?: InputMaybe<CommentLikeWhereUniqueInput>;
  orderBy?: InputMaybe<Array<CommentLikeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentLikeWhereInput>;
};


export type QueryAggregateCountryArgs = {
  cursor?: InputMaybe<CountryWhereUniqueInput>;
  orderBy?: InputMaybe<Array<CountryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CountryWhereInput>;
};


export type QueryAggregateEvaluationArgs = {
  cursor?: InputMaybe<EvaluationWhereUniqueInput>;
  orderBy?: InputMaybe<Array<EvaluationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EvaluationWhereInput>;
};


export type QueryAggregateFollowsArgs = {
  cursor?: InputMaybe<FollowsWhereUniqueInput>;
  orderBy?: InputMaybe<Array<FollowsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowsWhereInput>;
};


export type QueryAggregateInterestedSchoolsArgs = {
  cursor?: InputMaybe<InterestedSchoolsWhereUniqueInput>;
  orderBy?: InputMaybe<Array<InterestedSchoolsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<InterestedSchoolsWhereInput>;
};


export type QueryAggregatePositionArgs = {
  cursor?: InputMaybe<PositionWhereUniqueInput>;
  orderBy?: InputMaybe<Array<PositionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PositionWhereInput>;
};


export type QueryAggregatePositionCategoryArgs = {
  cursor?: InputMaybe<PositionCategoryWhereUniqueInput>;
  orderBy?: InputMaybe<Array<PositionCategoryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PositionCategoryWhereInput>;
};


export type QueryAggregatePostArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostWhereInput>;
};


export type QueryAggregatePostFlagArgs = {
  cursor?: InputMaybe<PostFlagWhereUniqueInput>;
  orderBy?: InputMaybe<Array<PostFlagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostFlagWhereInput>;
};


export type QueryAggregatePostLikeArgs = {
  cursor?: InputMaybe<PostLikeWhereUniqueInput>;
  orderBy?: InputMaybe<Array<PostLikeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostLikeWhereInput>;
};


export type QueryAggregateProspectedAthleteArgs = {
  cursor?: InputMaybe<ProspectedAthleteWhereUniqueInput>;
  orderBy?: InputMaybe<Array<ProspectedAthleteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProspectedAthleteWhereInput>;
};


export type QueryAggregateRecruitedAthleteArgs = {
  cursor?: InputMaybe<RecruitedAthleteWhereUniqueInput>;
  orderBy?: InputMaybe<Array<RecruitedAthleteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RecruitedAthleteWhereInput>;
};


export type QueryAggregateRoleArgs = {
  cursor?: InputMaybe<RoleWhereUniqueInput>;
  orderBy?: InputMaybe<Array<RoleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RoleWhereInput>;
};


export type QueryAggregateSchoolArgs = {
  cursor?: InputMaybe<SchoolWhereUniqueInput>;
  orderBy?: InputMaybe<Array<SchoolOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchoolWhereInput>;
};


export type QueryAggregateSchoolTypeArgs = {
  cursor?: InputMaybe<SchoolTypeWhereUniqueInput>;
  orderBy?: InputMaybe<Array<SchoolTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchoolTypeWhereInput>;
};


export type QueryAggregateSkillTypeArgs = {
  cursor?: InputMaybe<SkillTypeWhereUniqueInput>;
  orderBy?: InputMaybe<Array<SkillTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SkillTypeWhereInput>;
};


export type QueryAggregateSkillsArgs = {
  cursor?: InputMaybe<SkillsWhereUniqueInput>;
  orderBy?: InputMaybe<Array<SkillsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SkillsWhereInput>;
};


export type QueryAggregateTranscriptsArgs = {
  cursor?: InputMaybe<TranscriptsWhereUniqueInput>;
  orderBy?: InputMaybe<Array<TranscriptsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TranscriptsWhereInput>;
};


export type QueryAggregateUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryAthleteProfileArgs = {
  where: AthleteProfileWhereUniqueInput;
};


export type QueryAthleteProfilesArgs = {
  cursor?: InputMaybe<AthleteProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<AthleteProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AthleteProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AthleteProfileWhereInput>;
};


export type QueryCoachProfileArgs = {
  where: CoachProfileWhereUniqueInput;
};


export type QueryCoachProfilesArgs = {
  cursor?: InputMaybe<CoachProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<CoachProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CoachProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CoachProfileWhereInput>;
};


export type QueryCommentArgs = {
  where: CommentWhereUniqueInput;
};


export type QueryCommentLikeArgs = {
  where: CommentLikeWhereUniqueInput;
};


export type QueryCommentLikesArgs = {
  cursor?: InputMaybe<CommentLikeWhereUniqueInput>;
  distinct?: InputMaybe<Array<CommentLikeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CommentLikeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentLikeWhereInput>;
};


export type QueryCommentsArgs = {
  cursor?: InputMaybe<CommentWhereUniqueInput>;
  distinct?: InputMaybe<Array<CommentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CommentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentWhereInput>;
};


export type QueryCountriesArgs = {
  cursor?: InputMaybe<CountryWhereUniqueInput>;
  distinct?: InputMaybe<Array<CountryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CountryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CountryWhereInput>;
};


export type QueryCountryArgs = {
  where: CountryWhereUniqueInput;
};


export type QueryEvaluationArgs = {
  where: EvaluationWhereUniqueInput;
};


export type QueryEvaluationsArgs = {
  cursor?: InputMaybe<EvaluationWhereUniqueInput>;
  distinct?: InputMaybe<Array<EvaluationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EvaluationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EvaluationWhereInput>;
};


export type QueryFindFirstAccountTypeArgs = {
  cursor?: InputMaybe<AccountTypeWhereUniqueInput>;
  distinct?: InputMaybe<Array<AccountTypeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AccountTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountTypeWhereInput>;
};


export type QueryFindFirstAthleteProfileArgs = {
  cursor?: InputMaybe<AthleteProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<AthleteProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AthleteProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AthleteProfileWhereInput>;
};


export type QueryFindFirstBlocksArgs = {
  cursor?: InputMaybe<BlocksWhereUniqueInput>;
  distinct?: InputMaybe<Array<BlocksScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BlocksOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BlocksWhereInput>;
};


export type QueryFindFirstCoachProfileArgs = {
  cursor?: InputMaybe<CoachProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<CoachProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CoachProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CoachProfileWhereInput>;
};


export type QueryFindFirstCommentArgs = {
  cursor?: InputMaybe<CommentWhereUniqueInput>;
  distinct?: InputMaybe<Array<CommentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CommentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentWhereInput>;
};


export type QueryFindFirstCommentLikeArgs = {
  cursor?: InputMaybe<CommentLikeWhereUniqueInput>;
  distinct?: InputMaybe<Array<CommentLikeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CommentLikeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentLikeWhereInput>;
};


export type QueryFindFirstCountryArgs = {
  cursor?: InputMaybe<CountryWhereUniqueInput>;
  distinct?: InputMaybe<Array<CountryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CountryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CountryWhereInput>;
};


export type QueryFindFirstEvaluationArgs = {
  cursor?: InputMaybe<EvaluationWhereUniqueInput>;
  distinct?: InputMaybe<Array<EvaluationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EvaluationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EvaluationWhereInput>;
};


export type QueryFindFirstFollowsArgs = {
  cursor?: InputMaybe<FollowsWhereUniqueInput>;
  distinct?: InputMaybe<Array<FollowsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FollowsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowsWhereInput>;
};


export type QueryFindFirstInterestedSchoolsArgs = {
  cursor?: InputMaybe<InterestedSchoolsWhereUniqueInput>;
  distinct?: InputMaybe<Array<InterestedSchoolsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InterestedSchoolsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<InterestedSchoolsWhereInput>;
};


export type QueryFindFirstPositionArgs = {
  cursor?: InputMaybe<PositionWhereUniqueInput>;
  distinct?: InputMaybe<Array<PositionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PositionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PositionWhereInput>;
};


export type QueryFindFirstPositionCategoryArgs = {
  cursor?: InputMaybe<PositionCategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<PositionCategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PositionCategoryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PositionCategoryWhereInput>;
};


export type QueryFindFirstPostArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostWhereInput>;
};


export type QueryFindFirstPostFlagArgs = {
  cursor?: InputMaybe<PostFlagWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostFlagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostFlagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostFlagWhereInput>;
};


export type QueryFindFirstPostLikeArgs = {
  cursor?: InputMaybe<PostLikeWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostLikeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostLikeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostLikeWhereInput>;
};


export type QueryFindFirstProspectedAthleteArgs = {
  cursor?: InputMaybe<ProspectedAthleteWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProspectedAthleteScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProspectedAthleteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProspectedAthleteWhereInput>;
};


export type QueryFindFirstRecruitedAthleteArgs = {
  cursor?: InputMaybe<RecruitedAthleteWhereUniqueInput>;
  distinct?: InputMaybe<Array<RecruitedAthleteScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RecruitedAthleteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RecruitedAthleteWhereInput>;
};


export type QueryFindFirstRoleArgs = {
  cursor?: InputMaybe<RoleWhereUniqueInput>;
  distinct?: InputMaybe<Array<RoleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RoleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RoleWhereInput>;
};


export type QueryFindFirstSchoolArgs = {
  cursor?: InputMaybe<SchoolWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchoolScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchoolOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchoolWhereInput>;
};


export type QueryFindFirstSchoolTypeArgs = {
  cursor?: InputMaybe<SchoolTypeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchoolTypeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchoolTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchoolTypeWhereInput>;
};


export type QueryFindFirstSkillTypeArgs = {
  cursor?: InputMaybe<SkillTypeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SkillTypeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SkillTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SkillTypeWhereInput>;
};


export type QueryFindFirstSkillsArgs = {
  cursor?: InputMaybe<SkillsWhereUniqueInput>;
  distinct?: InputMaybe<Array<SkillsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SkillsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SkillsWhereInput>;
};


export type QueryFindFirstTranscriptsArgs = {
  cursor?: InputMaybe<TranscriptsWhereUniqueInput>;
  distinct?: InputMaybe<Array<TranscriptsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TranscriptsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TranscriptsWhereInput>;
};


export type QueryFindFirstUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryFindManyBlocksArgs = {
  cursor?: InputMaybe<BlocksWhereUniqueInput>;
  distinct?: InputMaybe<Array<BlocksScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BlocksOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BlocksWhereInput>;
};


export type QueryFindManyFollowsArgs = {
  cursor?: InputMaybe<FollowsWhereUniqueInput>;
  distinct?: InputMaybe<Array<FollowsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FollowsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowsWhereInput>;
};


export type QueryFindManyInterestedSchoolsArgs = {
  cursor?: InputMaybe<InterestedSchoolsWhereUniqueInput>;
  distinct?: InputMaybe<Array<InterestedSchoolsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InterestedSchoolsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<InterestedSchoolsWhereInput>;
};


export type QueryFindManySkillsArgs = {
  cursor?: InputMaybe<SkillsWhereUniqueInput>;
  distinct?: InputMaybe<Array<SkillsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SkillsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SkillsWhereInput>;
};


export type QueryFindManyTranscriptsArgs = {
  cursor?: InputMaybe<TranscriptsWhereUniqueInput>;
  distinct?: InputMaybe<Array<TranscriptsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TranscriptsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TranscriptsWhereInput>;
};


export type QueryFindUniqueBlocksArgs = {
  where: BlocksWhereUniqueInput;
};


export type QueryFindUniqueFollowsArgs = {
  where: FollowsWhereUniqueInput;
};


export type QueryFindUniqueInterestedSchoolsArgs = {
  where: InterestedSchoolsWhereUniqueInput;
};


export type QueryFindUniqueSkillsArgs = {
  where: SkillsWhereUniqueInput;
};


export type QueryFindUniqueTranscriptsArgs = {
  where: TranscriptsWhereUniqueInput;
};


export type QueryGroupByAccountTypeArgs = {
  by: Array<AccountTypeScalarFieldEnum>;
  having?: InputMaybe<AccountTypeScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<AccountTypeOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountTypeWhereInput>;
};


export type QueryGroupByAthleteProfileArgs = {
  by: Array<AthleteProfileScalarFieldEnum>;
  having?: InputMaybe<AthleteProfileScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<AthleteProfileOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AthleteProfileWhereInput>;
};


export type QueryGroupByBlocksArgs = {
  by: Array<BlocksScalarFieldEnum>;
  having?: InputMaybe<BlocksScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<BlocksOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BlocksWhereInput>;
};


export type QueryGroupByCoachProfileArgs = {
  by: Array<CoachProfileScalarFieldEnum>;
  having?: InputMaybe<CoachProfileScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<CoachProfileOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CoachProfileWhereInput>;
};


export type QueryGroupByCommentArgs = {
  by: Array<CommentScalarFieldEnum>;
  having?: InputMaybe<CommentScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<CommentOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentWhereInput>;
};


export type QueryGroupByCommentLikeArgs = {
  by: Array<CommentLikeScalarFieldEnum>;
  having?: InputMaybe<CommentLikeScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<CommentLikeOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentLikeWhereInput>;
};


export type QueryGroupByCountryArgs = {
  by: Array<CountryScalarFieldEnum>;
  having?: InputMaybe<CountryScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<CountryOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CountryWhereInput>;
};


export type QueryGroupByEvaluationArgs = {
  by: Array<EvaluationScalarFieldEnum>;
  having?: InputMaybe<EvaluationScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<EvaluationOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EvaluationWhereInput>;
};


export type QueryGroupByFollowsArgs = {
  by: Array<FollowsScalarFieldEnum>;
  having?: InputMaybe<FollowsScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<FollowsOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowsWhereInput>;
};


export type QueryGroupByInterestedSchoolsArgs = {
  by: Array<InterestedSchoolsScalarFieldEnum>;
  having?: InputMaybe<InterestedSchoolsScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<InterestedSchoolsOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<InterestedSchoolsWhereInput>;
};


export type QueryGroupByPositionArgs = {
  by: Array<PositionScalarFieldEnum>;
  having?: InputMaybe<PositionScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<PositionOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PositionWhereInput>;
};


export type QueryGroupByPositionCategoryArgs = {
  by: Array<PositionCategoryScalarFieldEnum>;
  having?: InputMaybe<PositionCategoryScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<PositionCategoryOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PositionCategoryWhereInput>;
};


export type QueryGroupByPostArgs = {
  by: Array<PostScalarFieldEnum>;
  having?: InputMaybe<PostScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<PostOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostWhereInput>;
};


export type QueryGroupByPostFlagArgs = {
  by: Array<PostFlagScalarFieldEnum>;
  having?: InputMaybe<PostFlagScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<PostFlagOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostFlagWhereInput>;
};


export type QueryGroupByPostLikeArgs = {
  by: Array<PostLikeScalarFieldEnum>;
  having?: InputMaybe<PostLikeScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<PostLikeOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostLikeWhereInput>;
};


export type QueryGroupByProspectedAthleteArgs = {
  by: Array<ProspectedAthleteScalarFieldEnum>;
  having?: InputMaybe<ProspectedAthleteScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<ProspectedAthleteOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProspectedAthleteWhereInput>;
};


export type QueryGroupByRecruitedAthleteArgs = {
  by: Array<RecruitedAthleteScalarFieldEnum>;
  having?: InputMaybe<RecruitedAthleteScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<RecruitedAthleteOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RecruitedAthleteWhereInput>;
};


export type QueryGroupByRoleArgs = {
  by: Array<RoleScalarFieldEnum>;
  having?: InputMaybe<RoleScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<RoleOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RoleWhereInput>;
};


export type QueryGroupBySchoolArgs = {
  by: Array<SchoolScalarFieldEnum>;
  having?: InputMaybe<SchoolScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<SchoolOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchoolWhereInput>;
};


export type QueryGroupBySchoolTypeArgs = {
  by: Array<SchoolTypeScalarFieldEnum>;
  having?: InputMaybe<SchoolTypeScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<SchoolTypeOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchoolTypeWhereInput>;
};


export type QueryGroupBySkillTypeArgs = {
  by: Array<SkillTypeScalarFieldEnum>;
  having?: InputMaybe<SkillTypeScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<SkillTypeOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SkillTypeWhereInput>;
};


export type QueryGroupBySkillsArgs = {
  by: Array<SkillsScalarFieldEnum>;
  having?: InputMaybe<SkillsScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<SkillsOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SkillsWhereInput>;
};


export type QueryGroupByTranscriptsArgs = {
  by: Array<TranscriptsScalarFieldEnum>;
  having?: InputMaybe<TranscriptsScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<TranscriptsOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TranscriptsWhereInput>;
};


export type QueryGroupByUserArgs = {
  by: Array<UserScalarFieldEnum>;
  having?: InputMaybe<UserScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryPositionArgs = {
  where: PositionWhereUniqueInput;
};


export type QueryPositionCategoriesArgs = {
  cursor?: InputMaybe<PositionCategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<PositionCategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PositionCategoryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PositionCategoryWhereInput>;
};


export type QueryPositionCategoryArgs = {
  where: PositionCategoryWhereUniqueInput;
};


export type QueryPositionsArgs = {
  cursor?: InputMaybe<PositionWhereUniqueInput>;
  distinct?: InputMaybe<Array<PositionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PositionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PositionWhereInput>;
};


export type QueryPostArgs = {
  where: PostWhereUniqueInput;
};


export type QueryPostFlagArgs = {
  where: PostFlagWhereUniqueInput;
};


export type QueryPostFlagsArgs = {
  cursor?: InputMaybe<PostFlagWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostFlagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostFlagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostFlagWhereInput>;
};


export type QueryPostLikeArgs = {
  where: PostLikeWhereUniqueInput;
};


export type QueryPostLikesArgs = {
  cursor?: InputMaybe<PostLikeWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostLikeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostLikeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostLikeWhereInput>;
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostWhereInput>;
};


export type QueryProspectedAthleteArgs = {
  where: ProspectedAthleteWhereUniqueInput;
};


export type QueryProspectedAthletesArgs = {
  cursor?: InputMaybe<ProspectedAthleteWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProspectedAthleteScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProspectedAthleteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProspectedAthleteWhereInput>;
};


export type QueryRecruitedAthleteArgs = {
  where: RecruitedAthleteWhereUniqueInput;
};


export type QueryRecruitedAthletesArgs = {
  cursor?: InputMaybe<RecruitedAthleteWhereUniqueInput>;
  distinct?: InputMaybe<Array<RecruitedAthleteScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RecruitedAthleteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RecruitedAthleteWhereInput>;
};


export type QueryRoleArgs = {
  where: RoleWhereUniqueInput;
};


export type QueryRolesArgs = {
  cursor?: InputMaybe<RoleWhereUniqueInput>;
  distinct?: InputMaybe<Array<RoleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RoleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RoleWhereInput>;
};


export type QuerySchoolArgs = {
  where: SchoolWhereUniqueInput;
};


export type QuerySchoolTypeArgs = {
  where: SchoolTypeWhereUniqueInput;
};


export type QuerySchoolTypesArgs = {
  cursor?: InputMaybe<SchoolTypeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchoolTypeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchoolTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchoolTypeWhereInput>;
};


export type QuerySchoolsArgs = {
  cursor?: InputMaybe<SchoolWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchoolScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchoolOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchoolWhereInput>;
};


export type QuerySkillTypeArgs = {
  where: SkillTypeWhereUniqueInput;
};


export type QuerySkillTypesArgs = {
  cursor?: InputMaybe<SkillTypeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SkillTypeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SkillTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SkillTypeWhereInput>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type RecruitedAthlete = {
  __typename?: 'RecruitedAthlete';
  User?: Maybe<User>;
  athlete: AthleteProfile;
  athleteId: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  school: School;
  schoolId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type RecruitedAthleteAthleteIdSchoolIdCompoundUniqueInput = {
  athleteId: Scalars['BigInt']['input'];
  schoolId: Scalars['BigInt']['input'];
};

export type RecruitedAthleteAvgAggregate = {
  __typename?: 'RecruitedAthleteAvgAggregate';
  athleteId?: Maybe<Scalars['Float']['output']>;
  schoolId?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type RecruitedAthleteAvgOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type RecruitedAthleteCountAggregate = {
  __typename?: 'RecruitedAthleteCountAggregate';
  _all: Scalars['Int']['output'];
  athleteId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  schoolId: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type RecruitedAthleteCountOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type RecruitedAthleteCreateInput = {
  User?: InputMaybe<UserCreateNestedOneWithoutRecruitedSchoolsInput>;
  athlete: AthleteProfileCreateNestedOneWithoutRecruitedSchoolsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesRecruitedInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type RecruitedAthleteCreateManyAthleteInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type RecruitedAthleteCreateManyAthleteInputEnvelope = {
  data: Array<RecruitedAthleteCreateManyAthleteInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecruitedAthleteCreateManyInput = {
  athleteId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type RecruitedAthleteCreateManySchoolInput = {
  athleteId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type RecruitedAthleteCreateManySchoolInputEnvelope = {
  data: Array<RecruitedAthleteCreateManySchoolInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecruitedAthleteCreateManyUserInput = {
  athleteId: Scalars['BigInt']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  schoolId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type RecruitedAthleteCreateManyUserInputEnvelope = {
  data: Array<RecruitedAthleteCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecruitedAthleteCreateNestedManyWithoutAthleteInput = {
  connect?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RecruitedAthleteCreateOrConnectWithoutAthleteInput>>;
  create?: InputMaybe<Array<RecruitedAthleteCreateWithoutAthleteInput>>;
  createMany?: InputMaybe<RecruitedAthleteCreateManyAthleteInputEnvelope>;
};

export type RecruitedAthleteCreateNestedManyWithoutSchoolInput = {
  connect?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RecruitedAthleteCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<RecruitedAthleteCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<RecruitedAthleteCreateManySchoolInputEnvelope>;
};

export type RecruitedAthleteCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RecruitedAthleteCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<RecruitedAthleteCreateWithoutUserInput>>;
  createMany?: InputMaybe<RecruitedAthleteCreateManyUserInputEnvelope>;
};

export type RecruitedAthleteCreateOrConnectWithoutAthleteInput = {
  create: RecruitedAthleteCreateWithoutAthleteInput;
  where: RecruitedAthleteWhereUniqueInput;
};

export type RecruitedAthleteCreateOrConnectWithoutSchoolInput = {
  create: RecruitedAthleteCreateWithoutSchoolInput;
  where: RecruitedAthleteWhereUniqueInput;
};

export type RecruitedAthleteCreateOrConnectWithoutUserInput = {
  create: RecruitedAthleteCreateWithoutUserInput;
  where: RecruitedAthleteWhereUniqueInput;
};

export type RecruitedAthleteCreateWithoutAthleteInput = {
  User?: InputMaybe<UserCreateNestedOneWithoutRecruitedSchoolsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesRecruitedInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type RecruitedAthleteCreateWithoutSchoolInput = {
  User?: InputMaybe<UserCreateNestedOneWithoutRecruitedSchoolsInput>;
  athlete: AthleteProfileCreateNestedOneWithoutRecruitedSchoolsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type RecruitedAthleteCreateWithoutUserInput = {
  athlete: AthleteProfileCreateNestedOneWithoutRecruitedSchoolsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  school: SchoolCreateNestedOneWithoutAthletesRecruitedInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type RecruitedAthleteGroupBy = {
  __typename?: 'RecruitedAthleteGroupBy';
  _avg?: Maybe<RecruitedAthleteAvgAggregate>;
  _count?: Maybe<RecruitedAthleteCountAggregate>;
  _max?: Maybe<RecruitedAthleteMaxAggregate>;
  _min?: Maybe<RecruitedAthleteMinAggregate>;
  _sum?: Maybe<RecruitedAthleteSumAggregate>;
  athleteId: Scalars['BigInt']['output'];
  createdAt: Scalars['DateTime']['output'];
  schoolId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type RecruitedAthleteListRelationFilter = {
  every?: InputMaybe<RecruitedAthleteWhereInput>;
  none?: InputMaybe<RecruitedAthleteWhereInput>;
  some?: InputMaybe<RecruitedAthleteWhereInput>;
};

export type RecruitedAthleteMaxAggregate = {
  __typename?: 'RecruitedAthleteMaxAggregate';
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type RecruitedAthleteMaxOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type RecruitedAthleteMinAggregate = {
  __typename?: 'RecruitedAthleteMinAggregate';
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type RecruitedAthleteMinOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type RecruitedAthleteOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RecruitedAthleteOrderByWithAggregationInput = {
  _avg?: InputMaybe<RecruitedAthleteAvgOrderByAggregateInput>;
  _count?: InputMaybe<RecruitedAthleteCountOrderByAggregateInput>;
  _max?: InputMaybe<RecruitedAthleteMaxOrderByAggregateInput>;
  _min?: InputMaybe<RecruitedAthleteMinOrderByAggregateInput>;
  _sum?: InputMaybe<RecruitedAthleteSumOrderByAggregateInput>;
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type RecruitedAthleteOrderByWithRelationInput = {
  User?: InputMaybe<UserOrderByWithRelationInput>;
  athlete?: InputMaybe<AthleteProfileOrderByWithRelationInput>;
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  school?: InputMaybe<SchoolOrderByWithRelationInput>;
  schoolId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export enum RecruitedAthleteScalarFieldEnum {
  AthleteId = 'athleteId',
  CreatedAt = 'createdAt',
  SchoolId = 'schoolId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type RecruitedAthleteScalarWhereInput = {
  AND?: InputMaybe<Array<RecruitedAthleteScalarWhereInput>>;
  NOT?: InputMaybe<Array<RecruitedAthleteScalarWhereInput>>;
  OR?: InputMaybe<Array<RecruitedAthleteScalarWhereInput>>;
  athleteId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  schoolId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntNullableFilter>;
};

export type RecruitedAthleteScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<RecruitedAthleteScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<RecruitedAthleteScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<RecruitedAthleteScalarWhereWithAggregatesInput>>;
  athleteId?: InputMaybe<BigIntWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  schoolId?: InputMaybe<BigIntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<BigIntNullableWithAggregatesFilter>;
};

export type RecruitedAthleteSumAggregate = {
  __typename?: 'RecruitedAthleteSumAggregate';
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  schoolId?: Maybe<Scalars['BigInt']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type RecruitedAthleteSumOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  schoolId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type RecruitedAthleteUpdateInput = {
  User?: InputMaybe<UserUpdateOneWithoutRecruitedSchoolsNestedInput>;
  athlete?: InputMaybe<AthleteProfileUpdateOneRequiredWithoutRecruitedSchoolsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesRecruitedNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type RecruitedAthleteUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type RecruitedAthleteUpdateManyWithWhereWithoutAthleteInput = {
  data: RecruitedAthleteUpdateManyMutationInput;
  where: RecruitedAthleteScalarWhereInput;
};

export type RecruitedAthleteUpdateManyWithWhereWithoutSchoolInput = {
  data: RecruitedAthleteUpdateManyMutationInput;
  where: RecruitedAthleteScalarWhereInput;
};

export type RecruitedAthleteUpdateManyWithWhereWithoutUserInput = {
  data: RecruitedAthleteUpdateManyMutationInput;
  where: RecruitedAthleteScalarWhereInput;
};

export type RecruitedAthleteUpdateManyWithoutAthleteNestedInput = {
  connect?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RecruitedAthleteCreateOrConnectWithoutAthleteInput>>;
  create?: InputMaybe<Array<RecruitedAthleteCreateWithoutAthleteInput>>;
  createMany?: InputMaybe<RecruitedAthleteCreateManyAthleteInputEnvelope>;
  delete?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RecruitedAthleteScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  set?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  update?: InputMaybe<Array<RecruitedAthleteUpdateWithWhereUniqueWithoutAthleteInput>>;
  updateMany?: InputMaybe<Array<RecruitedAthleteUpdateManyWithWhereWithoutAthleteInput>>;
  upsert?: InputMaybe<Array<RecruitedAthleteUpsertWithWhereUniqueWithoutAthleteInput>>;
};

export type RecruitedAthleteUpdateManyWithoutSchoolNestedInput = {
  connect?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RecruitedAthleteCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<RecruitedAthleteCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<RecruitedAthleteCreateManySchoolInputEnvelope>;
  delete?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RecruitedAthleteScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  set?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  update?: InputMaybe<Array<RecruitedAthleteUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: InputMaybe<Array<RecruitedAthleteUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: InputMaybe<Array<RecruitedAthleteUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type RecruitedAthleteUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RecruitedAthleteCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<RecruitedAthleteCreateWithoutUserInput>>;
  createMany?: InputMaybe<RecruitedAthleteCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RecruitedAthleteScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  set?: InputMaybe<Array<RecruitedAthleteWhereUniqueInput>>;
  update?: InputMaybe<Array<RecruitedAthleteUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<RecruitedAthleteUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<RecruitedAthleteUpsertWithWhereUniqueWithoutUserInput>>;
};

export type RecruitedAthleteUpdateWithWhereUniqueWithoutAthleteInput = {
  data: RecruitedAthleteUpdateWithoutAthleteInput;
  where: RecruitedAthleteWhereUniqueInput;
};

export type RecruitedAthleteUpdateWithWhereUniqueWithoutSchoolInput = {
  data: RecruitedAthleteUpdateWithoutSchoolInput;
  where: RecruitedAthleteWhereUniqueInput;
};

export type RecruitedAthleteUpdateWithWhereUniqueWithoutUserInput = {
  data: RecruitedAthleteUpdateWithoutUserInput;
  where: RecruitedAthleteWhereUniqueInput;
};

export type RecruitedAthleteUpdateWithoutAthleteInput = {
  User?: InputMaybe<UserUpdateOneWithoutRecruitedSchoolsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesRecruitedNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type RecruitedAthleteUpdateWithoutSchoolInput = {
  User?: InputMaybe<UserUpdateOneWithoutRecruitedSchoolsNestedInput>;
  athlete?: InputMaybe<AthleteProfileUpdateOneRequiredWithoutRecruitedSchoolsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type RecruitedAthleteUpdateWithoutUserInput = {
  athlete?: InputMaybe<AthleteProfileUpdateOneRequiredWithoutRecruitedSchoolsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutAthletesRecruitedNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type RecruitedAthleteUpsertWithWhereUniqueWithoutAthleteInput = {
  create: RecruitedAthleteCreateWithoutAthleteInput;
  update: RecruitedAthleteUpdateWithoutAthleteInput;
  where: RecruitedAthleteWhereUniqueInput;
};

export type RecruitedAthleteUpsertWithWhereUniqueWithoutSchoolInput = {
  create: RecruitedAthleteCreateWithoutSchoolInput;
  update: RecruitedAthleteUpdateWithoutSchoolInput;
  where: RecruitedAthleteWhereUniqueInput;
};

export type RecruitedAthleteUpsertWithWhereUniqueWithoutUserInput = {
  create: RecruitedAthleteCreateWithoutUserInput;
  update: RecruitedAthleteUpdateWithoutUserInput;
  where: RecruitedAthleteWhereUniqueInput;
};

export type RecruitedAthleteWhereInput = {
  AND?: InputMaybe<Array<RecruitedAthleteWhereInput>>;
  NOT?: InputMaybe<Array<RecruitedAthleteWhereInput>>;
  OR?: InputMaybe<Array<RecruitedAthleteWhereInput>>;
  User?: InputMaybe<UserRelationFilter>;
  athlete?: InputMaybe<AthleteProfileRelationFilter>;
  athleteId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  school?: InputMaybe<SchoolRelationFilter>;
  schoolId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<BigIntNullableFilter>;
};

export type RecruitedAthleteWhereUniqueInput = {
  athleteId_schoolId?: InputMaybe<RecruitedAthleteAthleteIdSchoolIdCompoundUniqueInput>;
};

export type RegisterCoachReturn = {
  __typename?: 'RegisterCoachReturn';
  coach: User;
};

export type Return = {
  __typename?: 'Return';
  aspectRatio: Scalars['Float']['output'];
  jobId: Scalars['String']['output'];
};

export type Role = {
  __typename?: 'Role';
  _count?: Maybe<RoleCount>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type RoleAvgAggregate = {
  __typename?: 'RoleAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type RoleAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type RoleCount = {
  __typename?: 'RoleCount';
  accountTypes: Scalars['Int']['output'];
  permissions: Scalars['Int']['output'];
  users: Scalars['Int']['output'];
};

export type RoleCountAggregate = {
  __typename?: 'RoleCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type RoleCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type RoleCreateInput = {
  accountTypes?: InputMaybe<AccountTypeCreateNestedManyWithoutRoleInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  permissions?: InputMaybe<PermissionCreateNestedManyWithoutRolesInput>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  users?: InputMaybe<UserCreateNestedManyWithoutRoleInput>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type RoleCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type RoleCreateNestedOneWithoutAccountTypesInput = {
  connect?: InputMaybe<RoleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RoleCreateOrConnectWithoutAccountTypesInput>;
  create?: InputMaybe<RoleCreateWithoutAccountTypesInput>;
};

export type RoleCreateNestedOneWithoutUsersInput = {
  connect?: InputMaybe<RoleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RoleCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<RoleCreateWithoutUsersInput>;
};

export type RoleCreateOrConnectWithoutAccountTypesInput = {
  create: RoleCreateWithoutAccountTypesInput;
  where: RoleWhereUniqueInput;
};

export type RoleCreateOrConnectWithoutUsersInput = {
  create: RoleCreateWithoutUsersInput;
  where: RoleWhereUniqueInput;
};

export type RoleCreateWithoutAccountTypesInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  permissions?: InputMaybe<PermissionCreateNestedManyWithoutRolesInput>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  users?: InputMaybe<UserCreateNestedManyWithoutRoleInput>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type RoleCreateWithoutUsersInput = {
  accountTypes?: InputMaybe<AccountTypeCreateNestedManyWithoutRoleInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  permissions?: InputMaybe<PermissionCreateNestedManyWithoutRolesInput>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type RoleGroupBy = {
  __typename?: 'RoleGroupBy';
  _avg?: Maybe<RoleAvgAggregate>;
  _count?: Maybe<RoleCountAggregate>;
  _max?: Maybe<RoleMaxAggregate>;
  _min?: Maybe<RoleMinAggregate>;
  _sum?: Maybe<RoleSumAggregate>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type RoleListRelationFilter = {
  every?: InputMaybe<RoleWhereInput>;
  none?: InputMaybe<RoleWhereInput>;
  some?: InputMaybe<RoleWhereInput>;
};

export type RoleMaxAggregate = {
  __typename?: 'RoleMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type RoleMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type RoleMinAggregate = {
  __typename?: 'RoleMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type RoleMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type RoleOrderByWithAggregationInput = {
  _avg?: InputMaybe<RoleAvgOrderByAggregateInput>;
  _count?: InputMaybe<RoleCountOrderByAggregateInput>;
  _max?: InputMaybe<RoleMaxOrderByAggregateInput>;
  _min?: InputMaybe<RoleMinOrderByAggregateInput>;
  _sum?: InputMaybe<RoleSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type RoleOrderByWithRelationInput = {
  accountTypes?: InputMaybe<AccountTypeOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  permissions?: InputMaybe<PermissionOrderByRelationAggregateInput>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
  uuid?: InputMaybe<SortOrder>;
};

export type RoleRelationFilter = {
  is?: InputMaybe<RoleWhereInput>;
  isNot?: InputMaybe<RoleWhereInput>;
};

export enum RoleScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  Uuid = 'uuid'
}

export type RoleScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<RoleScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<RoleScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<RoleScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  title?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
};

export type RoleSumAggregate = {
  __typename?: 'RoleSumAggregate';
  id?: Maybe<Scalars['BigInt']['output']>;
};

export type RoleSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type RoleUpdateInput = {
  accountTypes?: InputMaybe<AccountTypeUpdateManyWithoutRoleNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  permissions?: InputMaybe<PermissionUpdateManyWithoutRolesNestedInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutRoleNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RoleUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RoleUpdateOneWithoutAccountTypesNestedInput = {
  connect?: InputMaybe<RoleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RoleCreateOrConnectWithoutAccountTypesInput>;
  create?: InputMaybe<RoleCreateWithoutAccountTypesInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<RoleUpdateWithoutAccountTypesInput>;
  upsert?: InputMaybe<RoleUpsertWithoutAccountTypesInput>;
};

export type RoleUpdateOneWithoutUsersNestedInput = {
  connect?: InputMaybe<RoleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RoleCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<RoleCreateWithoutUsersInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<RoleUpdateWithoutUsersInput>;
  upsert?: InputMaybe<RoleUpsertWithoutUsersInput>;
};

export type RoleUpdateWithoutAccountTypesInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  permissions?: InputMaybe<PermissionUpdateManyWithoutRolesNestedInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutRoleNestedInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RoleUpdateWithoutUsersInput = {
  accountTypes?: InputMaybe<AccountTypeUpdateManyWithoutRoleNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  permissions?: InputMaybe<PermissionUpdateManyWithoutRolesNestedInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RoleUpsertWithoutAccountTypesInput = {
  create: RoleCreateWithoutAccountTypesInput;
  update: RoleUpdateWithoutAccountTypesInput;
};

export type RoleUpsertWithoutUsersInput = {
  create: RoleCreateWithoutUsersInput;
  update: RoleUpdateWithoutUsersInput;
};

export type RoleWhereInput = {
  AND?: InputMaybe<Array<RoleWhereInput>>;
  NOT?: InputMaybe<Array<RoleWhereInput>>;
  OR?: InputMaybe<Array<RoleWhereInput>>;
  accountTypes?: InputMaybe<AccountTypeListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  permissions?: InputMaybe<PermissionListRelationFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  users?: InputMaybe<UserListRelationFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type RoleWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type School = {
  __typename?: 'School';
  _count?: Maybe<SchoolCount>;
  address?: Maybe<Scalars['String']['output']>;
  athletes: Array<AthleteProfile>;
  athletesInterested: Array<InterestedSchools>;
  athletesProspected: Array<ProspectedAthlete>;
  athletesRecruited: Array<RecruitedAthlete>;
  backgroundImage?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  coaches: Array<CoachProfile>;
  conference?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  division?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  evaluations: Array<Evaluation>;
  id: Scalars['BigInt']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  posts: Array<Post>;
  primaryColor: Scalars['String']['output'];
  radius?: Maybe<Scalars['Int']['output']>;
  schoolType: SchoolType;
  schoolTypeId: Scalars['BigInt']['output'];
  secondaryColor: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  undergradStudents?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
  yearFounded?: Maybe<Scalars['String']['output']>;
  yearlyTuition?: Maybe<Scalars['String']['output']>;
};


export type SchoolAthletesArgs = {
  cursor?: InputMaybe<AthleteProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<AthleteProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AthleteProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AthleteProfileWhereInput>;
};


export type SchoolAthletesInterestedArgs = {
  cursor?: InputMaybe<InterestedSchoolsWhereUniqueInput>;
  distinct?: InputMaybe<Array<InterestedSchoolsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InterestedSchoolsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<InterestedSchoolsWhereInput>;
};


export type SchoolAthletesProspectedArgs = {
  cursor?: InputMaybe<ProspectedAthleteWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProspectedAthleteScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProspectedAthleteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProspectedAthleteWhereInput>;
};


export type SchoolAthletesRecruitedArgs = {
  cursor?: InputMaybe<RecruitedAthleteWhereUniqueInput>;
  distinct?: InputMaybe<Array<RecruitedAthleteScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RecruitedAthleteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RecruitedAthleteWhereInput>;
};


export type SchoolCoachesArgs = {
  cursor?: InputMaybe<CoachProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<CoachProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CoachProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CoachProfileWhereInput>;
};


export type SchoolEvaluationsArgs = {
  cursor?: InputMaybe<EvaluationWhereUniqueInput>;
  distinct?: InputMaybe<Array<EvaluationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EvaluationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EvaluationWhereInput>;
};


export type SchoolPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostWhereInput>;
};

export type SchoolAvgAggregate = {
  __typename?: 'SchoolAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  schoolTypeId?: Maybe<Scalars['Float']['output']>;
  undergradStudents?: Maybe<Scalars['Float']['output']>;
};

export type SchoolAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  radius?: InputMaybe<SortOrder>;
  schoolTypeId?: InputMaybe<SortOrder>;
  undergradStudents?: InputMaybe<SortOrder>;
};

export type SchoolCount = {
  __typename?: 'SchoolCount';
  athletes: Scalars['Int']['output'];
  athletesInterested: Scalars['Int']['output'];
  athletesProspected: Scalars['Int']['output'];
  athletesRecruited: Scalars['Int']['output'];
  coaches: Scalars['Int']['output'];
  evaluations: Scalars['Int']['output'];
  posts: Scalars['Int']['output'];
};

export type SchoolCountAggregate = {
  __typename?: 'SchoolCountAggregate';
  _all: Scalars['Int']['output'];
  address: Scalars['Int']['output'];
  backgroundImage: Scalars['Int']['output'];
  city: Scalars['Int']['output'];
  conference: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  division: Scalars['Int']['output'];
  email: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  latitude: Scalars['Int']['output'];
  logo: Scalars['Int']['output'];
  longitude: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  primaryColor: Scalars['Int']['output'];
  radius: Scalars['Int']['output'];
  schoolTypeId: Scalars['Int']['output'];
  secondaryColor: Scalars['Int']['output'];
  state: Scalars['Int']['output'];
  undergradStudents: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
  yearFounded: Scalars['Int']['output'];
  yearlyTuition: Scalars['Int']['output'];
};

export type SchoolCountOrderByAggregateInput = {
  address?: InputMaybe<SortOrder>;
  backgroundImage?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  conference?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  division?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  logo?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  primaryColor?: InputMaybe<SortOrder>;
  radius?: InputMaybe<SortOrder>;
  schoolTypeId?: InputMaybe<SortOrder>;
  secondaryColor?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  undergradStudents?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  yearFounded?: InputMaybe<SortOrder>;
  yearlyTuition?: InputMaybe<SortOrder>;
};

export type SchoolCreateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  athletes?: InputMaybe<AthleteProfileCreateNestedManyWithoutSchoolInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutSchoolInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutSchoolInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutSchoolInput>;
  backgroundImage?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  coaches?: InputMaybe<CoachProfileCreateNestedManyWithoutSchoolInput>;
  conference?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutSchoolInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  posts?: InputMaybe<PostCreateNestedManyWithoutSchoolInput>;
  primaryColor: Scalars['String']['input'];
  radius?: InputMaybe<Scalars['Int']['input']>;
  schoolType: SchoolTypeCreateNestedOneWithoutSchoolsInput;
  secondaryColor: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  undergradStudents?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  yearFounded?: InputMaybe<Scalars['String']['input']>;
  yearlyTuition?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolCreateManyInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  backgroundImage?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  conference?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['BigInt']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  primaryColor: Scalars['String']['input'];
  radius?: InputMaybe<Scalars['Int']['input']>;
  schoolTypeId: Scalars['BigInt']['input'];
  secondaryColor: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  undergradStudents?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  yearFounded?: InputMaybe<Scalars['String']['input']>;
  yearlyTuition?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolCreateManySchoolTypeInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  backgroundImage?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  conference?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['BigInt']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  primaryColor: Scalars['String']['input'];
  radius?: InputMaybe<Scalars['Int']['input']>;
  secondaryColor: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  undergradStudents?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  yearFounded?: InputMaybe<Scalars['String']['input']>;
  yearlyTuition?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolCreateManySchoolTypeInputEnvelope = {
  data: Array<SchoolCreateManySchoolTypeInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SchoolCreateNestedManyWithoutSchoolTypeInput = {
  connect?: InputMaybe<Array<SchoolWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SchoolCreateOrConnectWithoutSchoolTypeInput>>;
  create?: InputMaybe<Array<SchoolCreateWithoutSchoolTypeInput>>;
  createMany?: InputMaybe<SchoolCreateManySchoolTypeInputEnvelope>;
};

export type SchoolCreateNestedOneWithoutAthletesInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutAthletesInput>;
  create?: InputMaybe<SchoolCreateWithoutAthletesInput>;
};

export type SchoolCreateNestedOneWithoutAthletesInterestedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutAthletesInterestedInput>;
  create?: InputMaybe<SchoolCreateWithoutAthletesInterestedInput>;
};

export type SchoolCreateNestedOneWithoutAthletesProspectedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutAthletesProspectedInput>;
  create?: InputMaybe<SchoolCreateWithoutAthletesProspectedInput>;
};

export type SchoolCreateNestedOneWithoutAthletesRecruitedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutAthletesRecruitedInput>;
  create?: InputMaybe<SchoolCreateWithoutAthletesRecruitedInput>;
};

export type SchoolCreateNestedOneWithoutCoachesInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutCoachesInput>;
  create?: InputMaybe<SchoolCreateWithoutCoachesInput>;
};

export type SchoolCreateNestedOneWithoutEvaluationsInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutEvaluationsInput>;
  create?: InputMaybe<SchoolCreateWithoutEvaluationsInput>;
};

export type SchoolCreateNestedOneWithoutPostsInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutPostsInput>;
  create?: InputMaybe<SchoolCreateWithoutPostsInput>;
};

export type SchoolCreateOrConnectWithoutAthletesInput = {
  create: SchoolCreateWithoutAthletesInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutAthletesInterestedInput = {
  create: SchoolCreateWithoutAthletesInterestedInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutAthletesProspectedInput = {
  create: SchoolCreateWithoutAthletesProspectedInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutAthletesRecruitedInput = {
  create: SchoolCreateWithoutAthletesRecruitedInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutCoachesInput = {
  create: SchoolCreateWithoutCoachesInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutEvaluationsInput = {
  create: SchoolCreateWithoutEvaluationsInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutPostsInput = {
  create: SchoolCreateWithoutPostsInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutSchoolTypeInput = {
  create: SchoolCreateWithoutSchoolTypeInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateWithoutAthletesInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  athletesInterested?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutSchoolInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutSchoolInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutSchoolInput>;
  backgroundImage?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  coaches?: InputMaybe<CoachProfileCreateNestedManyWithoutSchoolInput>;
  conference?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutSchoolInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  posts?: InputMaybe<PostCreateNestedManyWithoutSchoolInput>;
  primaryColor: Scalars['String']['input'];
  radius?: InputMaybe<Scalars['Int']['input']>;
  schoolType: SchoolTypeCreateNestedOneWithoutSchoolsInput;
  secondaryColor: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  undergradStudents?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  yearFounded?: InputMaybe<Scalars['String']['input']>;
  yearlyTuition?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolCreateWithoutAthletesInterestedInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  athletes?: InputMaybe<AthleteProfileCreateNestedManyWithoutSchoolInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutSchoolInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutSchoolInput>;
  backgroundImage?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  coaches?: InputMaybe<CoachProfileCreateNestedManyWithoutSchoolInput>;
  conference?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutSchoolInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  posts?: InputMaybe<PostCreateNestedManyWithoutSchoolInput>;
  primaryColor: Scalars['String']['input'];
  radius?: InputMaybe<Scalars['Int']['input']>;
  schoolType: SchoolTypeCreateNestedOneWithoutSchoolsInput;
  secondaryColor: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  undergradStudents?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  yearFounded?: InputMaybe<Scalars['String']['input']>;
  yearlyTuition?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolCreateWithoutAthletesProspectedInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  athletes?: InputMaybe<AthleteProfileCreateNestedManyWithoutSchoolInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutSchoolInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutSchoolInput>;
  backgroundImage?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  coaches?: InputMaybe<CoachProfileCreateNestedManyWithoutSchoolInput>;
  conference?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutSchoolInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  posts?: InputMaybe<PostCreateNestedManyWithoutSchoolInput>;
  primaryColor: Scalars['String']['input'];
  radius?: InputMaybe<Scalars['Int']['input']>;
  schoolType: SchoolTypeCreateNestedOneWithoutSchoolsInput;
  secondaryColor: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  undergradStudents?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  yearFounded?: InputMaybe<Scalars['String']['input']>;
  yearlyTuition?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolCreateWithoutAthletesRecruitedInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  athletes?: InputMaybe<AthleteProfileCreateNestedManyWithoutSchoolInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutSchoolInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutSchoolInput>;
  backgroundImage?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  coaches?: InputMaybe<CoachProfileCreateNestedManyWithoutSchoolInput>;
  conference?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutSchoolInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  posts?: InputMaybe<PostCreateNestedManyWithoutSchoolInput>;
  primaryColor: Scalars['String']['input'];
  radius?: InputMaybe<Scalars['Int']['input']>;
  schoolType: SchoolTypeCreateNestedOneWithoutSchoolsInput;
  secondaryColor: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  undergradStudents?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  yearFounded?: InputMaybe<Scalars['String']['input']>;
  yearlyTuition?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolCreateWithoutCoachesInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  athletes?: InputMaybe<AthleteProfileCreateNestedManyWithoutSchoolInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutSchoolInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutSchoolInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutSchoolInput>;
  backgroundImage?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  conference?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutSchoolInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  posts?: InputMaybe<PostCreateNestedManyWithoutSchoolInput>;
  primaryColor: Scalars['String']['input'];
  radius?: InputMaybe<Scalars['Int']['input']>;
  schoolType: SchoolTypeCreateNestedOneWithoutSchoolsInput;
  secondaryColor: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  undergradStudents?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  yearFounded?: InputMaybe<Scalars['String']['input']>;
  yearlyTuition?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolCreateWithoutEvaluationsInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  athletes?: InputMaybe<AthleteProfileCreateNestedManyWithoutSchoolInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutSchoolInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutSchoolInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutSchoolInput>;
  backgroundImage?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  coaches?: InputMaybe<CoachProfileCreateNestedManyWithoutSchoolInput>;
  conference?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['BigInt']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  posts?: InputMaybe<PostCreateNestedManyWithoutSchoolInput>;
  primaryColor: Scalars['String']['input'];
  radius?: InputMaybe<Scalars['Int']['input']>;
  schoolType: SchoolTypeCreateNestedOneWithoutSchoolsInput;
  secondaryColor: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  undergradStudents?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  yearFounded?: InputMaybe<Scalars['String']['input']>;
  yearlyTuition?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolCreateWithoutPostsInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  athletes?: InputMaybe<AthleteProfileCreateNestedManyWithoutSchoolInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutSchoolInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutSchoolInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutSchoolInput>;
  backgroundImage?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  coaches?: InputMaybe<CoachProfileCreateNestedManyWithoutSchoolInput>;
  conference?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutSchoolInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  primaryColor: Scalars['String']['input'];
  radius?: InputMaybe<Scalars['Int']['input']>;
  schoolType: SchoolTypeCreateNestedOneWithoutSchoolsInput;
  secondaryColor: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  undergradStudents?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  yearFounded?: InputMaybe<Scalars['String']['input']>;
  yearlyTuition?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolCreateWithoutSchoolTypeInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  athletes?: InputMaybe<AthleteProfileCreateNestedManyWithoutSchoolInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutSchoolInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutSchoolInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutSchoolInput>;
  backgroundImage?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  coaches?: InputMaybe<CoachProfileCreateNestedManyWithoutSchoolInput>;
  conference?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  evaluations?: InputMaybe<EvaluationCreateNestedManyWithoutSchoolInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  posts?: InputMaybe<PostCreateNestedManyWithoutSchoolInput>;
  primaryColor: Scalars['String']['input'];
  radius?: InputMaybe<Scalars['Int']['input']>;
  secondaryColor: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  undergradStudents?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  yearFounded?: InputMaybe<Scalars['String']['input']>;
  yearlyTuition?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolGroupBy = {
  __typename?: 'SchoolGroupBy';
  _avg?: Maybe<SchoolAvgAggregate>;
  _count?: Maybe<SchoolCountAggregate>;
  _max?: Maybe<SchoolMaxAggregate>;
  _min?: Maybe<SchoolMinAggregate>;
  _sum?: Maybe<SchoolSumAggregate>;
  address?: Maybe<Scalars['String']['output']>;
  backgroundImage?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  conference?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  division?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  primaryColor: Scalars['String']['output'];
  radius?: Maybe<Scalars['Int']['output']>;
  schoolTypeId: Scalars['BigInt']['output'];
  secondaryColor: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  undergradStudents?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
  yearFounded?: Maybe<Scalars['String']['output']>;
  yearlyTuition?: Maybe<Scalars['String']['output']>;
};

export type SchoolListRelationFilter = {
  every?: InputMaybe<SchoolWhereInput>;
  none?: InputMaybe<SchoolWhereInput>;
  some?: InputMaybe<SchoolWhereInput>;
};

export type SchoolMaxAggregate = {
  __typename?: 'SchoolMaxAggregate';
  address?: Maybe<Scalars['String']['output']>;
  backgroundImage?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  conference?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  division?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  primaryColor?: Maybe<Scalars['String']['output']>;
  radius?: Maybe<Scalars['Int']['output']>;
  schoolTypeId?: Maybe<Scalars['BigInt']['output']>;
  secondaryColor?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  undergradStudents?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  yearFounded?: Maybe<Scalars['String']['output']>;
  yearlyTuition?: Maybe<Scalars['String']['output']>;
};

export type SchoolMaxOrderByAggregateInput = {
  address?: InputMaybe<SortOrder>;
  backgroundImage?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  conference?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  division?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  logo?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  primaryColor?: InputMaybe<SortOrder>;
  radius?: InputMaybe<SortOrder>;
  schoolTypeId?: InputMaybe<SortOrder>;
  secondaryColor?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  undergradStudents?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  yearFounded?: InputMaybe<SortOrder>;
  yearlyTuition?: InputMaybe<SortOrder>;
};

export type SchoolMinAggregate = {
  __typename?: 'SchoolMinAggregate';
  address?: Maybe<Scalars['String']['output']>;
  backgroundImage?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  conference?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  division?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  primaryColor?: Maybe<Scalars['String']['output']>;
  radius?: Maybe<Scalars['Int']['output']>;
  schoolTypeId?: Maybe<Scalars['BigInt']['output']>;
  secondaryColor?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  undergradStudents?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  yearFounded?: Maybe<Scalars['String']['output']>;
  yearlyTuition?: Maybe<Scalars['String']['output']>;
};

export type SchoolMinOrderByAggregateInput = {
  address?: InputMaybe<SortOrder>;
  backgroundImage?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  conference?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  division?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  logo?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  primaryColor?: InputMaybe<SortOrder>;
  radius?: InputMaybe<SortOrder>;
  schoolTypeId?: InputMaybe<SortOrder>;
  secondaryColor?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  undergradStudents?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  yearFounded?: InputMaybe<SortOrder>;
  yearlyTuition?: InputMaybe<SortOrder>;
};

export type SchoolOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type SchoolOrderByWithAggregationInput = {
  _avg?: InputMaybe<SchoolAvgOrderByAggregateInput>;
  _count?: InputMaybe<SchoolCountOrderByAggregateInput>;
  _max?: InputMaybe<SchoolMaxOrderByAggregateInput>;
  _min?: InputMaybe<SchoolMinOrderByAggregateInput>;
  _sum?: InputMaybe<SchoolSumOrderByAggregateInput>;
  address?: InputMaybe<SortOrder>;
  backgroundImage?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  conference?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  division?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  logo?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  primaryColor?: InputMaybe<SortOrder>;
  radius?: InputMaybe<SortOrder>;
  schoolTypeId?: InputMaybe<SortOrder>;
  secondaryColor?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  undergradStudents?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  yearFounded?: InputMaybe<SortOrder>;
  yearlyTuition?: InputMaybe<SortOrder>;
};

export type SchoolOrderByWithRelationInput = {
  address?: InputMaybe<SortOrder>;
  athletes?: InputMaybe<AthleteProfileOrderByRelationAggregateInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsOrderByRelationAggregateInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteOrderByRelationAggregateInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteOrderByRelationAggregateInput>;
  backgroundImage?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  coaches?: InputMaybe<CoachProfileOrderByRelationAggregateInput>;
  conference?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  division?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  evaluations?: InputMaybe<EvaluationOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  logo?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  posts?: InputMaybe<PostOrderByRelationAggregateInput>;
  primaryColor?: InputMaybe<SortOrder>;
  radius?: InputMaybe<SortOrder>;
  schoolType?: InputMaybe<SchoolTypeOrderByWithRelationInput>;
  schoolTypeId?: InputMaybe<SortOrder>;
  secondaryColor?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  undergradStudents?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  yearFounded?: InputMaybe<SortOrder>;
  yearlyTuition?: InputMaybe<SortOrder>;
};

export type SchoolRelationFilter = {
  is?: InputMaybe<SchoolWhereInput>;
  isNot?: InputMaybe<SchoolWhereInput>;
};

export enum SchoolScalarFieldEnum {
  Address = 'address',
  BackgroundImage = 'backgroundImage',
  City = 'city',
  Conference = 'conference',
  CreatedAt = 'createdAt',
  Description = 'description',
  Division = 'division',
  Email = 'email',
  Id = 'id',
  Latitude = 'latitude',
  Logo = 'logo',
  Longitude = 'longitude',
  Name = 'name',
  PrimaryColor = 'primaryColor',
  Radius = 'radius',
  SchoolTypeId = 'schoolTypeId',
  SecondaryColor = 'secondaryColor',
  State = 'state',
  UndergradStudents = 'undergradStudents',
  UpdatedAt = 'updatedAt',
  Uuid = 'uuid',
  YearFounded = 'yearFounded',
  YearlyTuition = 'yearlyTuition'
}

export type SchoolScalarWhereInput = {
  AND?: InputMaybe<Array<SchoolScalarWhereInput>>;
  NOT?: InputMaybe<Array<SchoolScalarWhereInput>>;
  OR?: InputMaybe<Array<SchoolScalarWhereInput>>;
  address?: InputMaybe<StringNullableFilter>;
  backgroundImage?: InputMaybe<StringNullableFilter>;
  city?: InputMaybe<StringNullableFilter>;
  conference?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  division?: InputMaybe<StringNullableFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<BigIntFilter>;
  latitude?: InputMaybe<FloatNullableFilter>;
  logo?: InputMaybe<StringNullableFilter>;
  longitude?: InputMaybe<FloatNullableFilter>;
  name?: InputMaybe<StringFilter>;
  primaryColor?: InputMaybe<StringFilter>;
  radius?: InputMaybe<IntNullableFilter>;
  schoolTypeId?: InputMaybe<BigIntFilter>;
  secondaryColor?: InputMaybe<StringFilter>;
  state?: InputMaybe<StringNullableFilter>;
  undergradStudents?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
  yearFounded?: InputMaybe<StringNullableFilter>;
  yearlyTuition?: InputMaybe<StringNullableFilter>;
};

export type SchoolScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SchoolScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<SchoolScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SchoolScalarWhereWithAggregatesInput>>;
  address?: InputMaybe<StringNullableWithAggregatesFilter>;
  backgroundImage?: InputMaybe<StringNullableWithAggregatesFilter>;
  city?: InputMaybe<StringNullableWithAggregatesFilter>;
  conference?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  division?: InputMaybe<StringNullableWithAggregatesFilter>;
  email?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  latitude?: InputMaybe<FloatNullableWithAggregatesFilter>;
  logo?: InputMaybe<StringNullableWithAggregatesFilter>;
  longitude?: InputMaybe<FloatNullableWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  primaryColor?: InputMaybe<StringWithAggregatesFilter>;
  radius?: InputMaybe<IntNullableWithAggregatesFilter>;
  schoolTypeId?: InputMaybe<BigIntWithAggregatesFilter>;
  secondaryColor?: InputMaybe<StringWithAggregatesFilter>;
  state?: InputMaybe<StringNullableWithAggregatesFilter>;
  undergradStudents?: InputMaybe<IntNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
  yearFounded?: InputMaybe<StringNullableWithAggregatesFilter>;
  yearlyTuition?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type SchoolSumAggregate = {
  __typename?: 'SchoolSumAggregate';
  id?: Maybe<Scalars['BigInt']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Int']['output']>;
  schoolTypeId?: Maybe<Scalars['BigInt']['output']>;
  undergradStudents?: Maybe<Scalars['Int']['output']>;
};

export type SchoolSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  radius?: InputMaybe<SortOrder>;
  schoolTypeId?: InputMaybe<SortOrder>;
  undergradStudents?: InputMaybe<SortOrder>;
};

export type SchoolType = {
  __typename?: 'SchoolType';
  _count?: Maybe<SchoolTypeCount>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  schools: Array<School>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};


export type SchoolTypeSchoolsArgs = {
  cursor?: InputMaybe<SchoolWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchoolScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchoolOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchoolWhereInput>;
};

export type SchoolTypeAvgAggregate = {
  __typename?: 'SchoolTypeAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type SchoolTypeAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type SchoolTypeCount = {
  __typename?: 'SchoolTypeCount';
  schools: Scalars['Int']['output'];
};

export type SchoolTypeCountAggregate = {
  __typename?: 'SchoolTypeCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type SchoolTypeCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type SchoolTypeCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  schools?: InputMaybe<SchoolCreateNestedManyWithoutSchoolTypeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolTypeCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolTypeCreateNestedOneWithoutSchoolsInput = {
  connect?: InputMaybe<SchoolTypeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolTypeCreateOrConnectWithoutSchoolsInput>;
  create?: InputMaybe<SchoolTypeCreateWithoutSchoolsInput>;
};

export type SchoolTypeCreateOrConnectWithoutSchoolsInput = {
  create: SchoolTypeCreateWithoutSchoolsInput;
  where: SchoolTypeWhereUniqueInput;
};

export type SchoolTypeCreateWithoutSchoolsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolTypeGroupBy = {
  __typename?: 'SchoolTypeGroupBy';
  _avg?: Maybe<SchoolTypeAvgAggregate>;
  _count?: Maybe<SchoolTypeCountAggregate>;
  _max?: Maybe<SchoolTypeMaxAggregate>;
  _min?: Maybe<SchoolTypeMinAggregate>;
  _sum?: Maybe<SchoolTypeSumAggregate>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type SchoolTypeMaxAggregate = {
  __typename?: 'SchoolTypeMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type SchoolTypeMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type SchoolTypeMinAggregate = {
  __typename?: 'SchoolTypeMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type SchoolTypeMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type SchoolTypeOrderByWithAggregationInput = {
  _avg?: InputMaybe<SchoolTypeAvgOrderByAggregateInput>;
  _count?: InputMaybe<SchoolTypeCountOrderByAggregateInput>;
  _max?: InputMaybe<SchoolTypeMaxOrderByAggregateInput>;
  _min?: InputMaybe<SchoolTypeMinOrderByAggregateInput>;
  _sum?: InputMaybe<SchoolTypeSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type SchoolTypeOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  schools?: InputMaybe<SchoolOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type SchoolTypeRelationFilter = {
  is?: InputMaybe<SchoolTypeWhereInput>;
  isNot?: InputMaybe<SchoolTypeWhereInput>;
};

export enum SchoolTypeScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt',
  Uuid = 'uuid'
}

export type SchoolTypeScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SchoolTypeScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<SchoolTypeScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SchoolTypeScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
};

export type SchoolTypeSumAggregate = {
  __typename?: 'SchoolTypeSumAggregate';
  id?: Maybe<Scalars['BigInt']['output']>;
};

export type SchoolTypeSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type SchoolTypeUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  schools?: InputMaybe<SchoolUpdateManyWithoutSchoolTypeNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SchoolTypeUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SchoolTypeUpdateOneRequiredWithoutSchoolsNestedInput = {
  connect?: InputMaybe<SchoolTypeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolTypeCreateOrConnectWithoutSchoolsInput>;
  create?: InputMaybe<SchoolTypeCreateWithoutSchoolsInput>;
  update?: InputMaybe<SchoolTypeUpdateWithoutSchoolsInput>;
  upsert?: InputMaybe<SchoolTypeUpsertWithoutSchoolsInput>;
};

export type SchoolTypeUpdateWithoutSchoolsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SchoolTypeUpsertWithoutSchoolsInput = {
  create: SchoolTypeCreateWithoutSchoolsInput;
  update: SchoolTypeUpdateWithoutSchoolsInput;
};

export type SchoolTypeWhereInput = {
  AND?: InputMaybe<Array<SchoolTypeWhereInput>>;
  NOT?: InputMaybe<Array<SchoolTypeWhereInput>>;
  OR?: InputMaybe<Array<SchoolTypeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  schools?: InputMaybe<SchoolListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type SchoolTypeWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolUpdateInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athletes?: InputMaybe<AthleteProfileUpdateManyWithoutSchoolNestedInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsUpdateManyWithoutSchoolNestedInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteUpdateManyWithoutSchoolNestedInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteUpdateManyWithoutSchoolNestedInput>;
  backgroundImage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coaches?: InputMaybe<CoachProfileUpdateManyWithoutSchoolNestedInput>;
  conference?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  division?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutSchoolNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  logo?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUpdateManyWithoutSchoolNestedInput>;
  primaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  schoolType?: InputMaybe<SchoolTypeUpdateOneRequiredWithoutSchoolsNestedInput>;
  secondaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  undergradStudents?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  yearFounded?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  yearlyTuition?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SchoolUpdateManyMutationInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  backgroundImage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  conference?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  division?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  logo?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  primaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  secondaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  undergradStudents?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  yearFounded?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  yearlyTuition?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SchoolUpdateManyWithWhereWithoutSchoolTypeInput = {
  data: SchoolUpdateManyMutationInput;
  where: SchoolScalarWhereInput;
};

export type SchoolUpdateManyWithoutSchoolTypeNestedInput = {
  connect?: InputMaybe<Array<SchoolWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SchoolCreateOrConnectWithoutSchoolTypeInput>>;
  create?: InputMaybe<Array<SchoolCreateWithoutSchoolTypeInput>>;
  createMany?: InputMaybe<SchoolCreateManySchoolTypeInputEnvelope>;
  delete?: InputMaybe<Array<SchoolWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SchoolScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SchoolWhereUniqueInput>>;
  set?: InputMaybe<Array<SchoolWhereUniqueInput>>;
  update?: InputMaybe<Array<SchoolUpdateWithWhereUniqueWithoutSchoolTypeInput>>;
  updateMany?: InputMaybe<Array<SchoolUpdateManyWithWhereWithoutSchoolTypeInput>>;
  upsert?: InputMaybe<Array<SchoolUpsertWithWhereUniqueWithoutSchoolTypeInput>>;
};

export type SchoolUpdateOneRequiredWithoutAthletesInterestedNestedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutAthletesInterestedInput>;
  create?: InputMaybe<SchoolCreateWithoutAthletesInterestedInput>;
  update?: InputMaybe<SchoolUpdateWithoutAthletesInterestedInput>;
  upsert?: InputMaybe<SchoolUpsertWithoutAthletesInterestedInput>;
};

export type SchoolUpdateOneRequiredWithoutAthletesNestedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutAthletesInput>;
  create?: InputMaybe<SchoolCreateWithoutAthletesInput>;
  update?: InputMaybe<SchoolUpdateWithoutAthletesInput>;
  upsert?: InputMaybe<SchoolUpsertWithoutAthletesInput>;
};

export type SchoolUpdateOneRequiredWithoutAthletesProspectedNestedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutAthletesProspectedInput>;
  create?: InputMaybe<SchoolCreateWithoutAthletesProspectedInput>;
  update?: InputMaybe<SchoolUpdateWithoutAthletesProspectedInput>;
  upsert?: InputMaybe<SchoolUpsertWithoutAthletesProspectedInput>;
};

export type SchoolUpdateOneRequiredWithoutAthletesRecruitedNestedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutAthletesRecruitedInput>;
  create?: InputMaybe<SchoolCreateWithoutAthletesRecruitedInput>;
  update?: InputMaybe<SchoolUpdateWithoutAthletesRecruitedInput>;
  upsert?: InputMaybe<SchoolUpsertWithoutAthletesRecruitedInput>;
};

export type SchoolUpdateOneRequiredWithoutCoachesNestedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutCoachesInput>;
  create?: InputMaybe<SchoolCreateWithoutCoachesInput>;
  update?: InputMaybe<SchoolUpdateWithoutCoachesInput>;
  upsert?: InputMaybe<SchoolUpsertWithoutCoachesInput>;
};

export type SchoolUpdateOneRequiredWithoutEvaluationsNestedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutEvaluationsInput>;
  create?: InputMaybe<SchoolCreateWithoutEvaluationsInput>;
  update?: InputMaybe<SchoolUpdateWithoutEvaluationsInput>;
  upsert?: InputMaybe<SchoolUpsertWithoutEvaluationsInput>;
};

export type SchoolUpdateOneWithoutPostsNestedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutPostsInput>;
  create?: InputMaybe<SchoolCreateWithoutPostsInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<SchoolUpdateWithoutPostsInput>;
  upsert?: InputMaybe<SchoolUpsertWithoutPostsInput>;
};

export type SchoolUpdateWithWhereUniqueWithoutSchoolTypeInput = {
  data: SchoolUpdateWithoutSchoolTypeInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolUpdateWithoutAthletesInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsUpdateManyWithoutSchoolNestedInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteUpdateManyWithoutSchoolNestedInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteUpdateManyWithoutSchoolNestedInput>;
  backgroundImage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coaches?: InputMaybe<CoachProfileUpdateManyWithoutSchoolNestedInput>;
  conference?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  division?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutSchoolNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  logo?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUpdateManyWithoutSchoolNestedInput>;
  primaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  schoolType?: InputMaybe<SchoolTypeUpdateOneRequiredWithoutSchoolsNestedInput>;
  secondaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  undergradStudents?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  yearFounded?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  yearlyTuition?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutAthletesInterestedInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athletes?: InputMaybe<AthleteProfileUpdateManyWithoutSchoolNestedInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteUpdateManyWithoutSchoolNestedInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteUpdateManyWithoutSchoolNestedInput>;
  backgroundImage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coaches?: InputMaybe<CoachProfileUpdateManyWithoutSchoolNestedInput>;
  conference?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  division?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutSchoolNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  logo?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUpdateManyWithoutSchoolNestedInput>;
  primaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  schoolType?: InputMaybe<SchoolTypeUpdateOneRequiredWithoutSchoolsNestedInput>;
  secondaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  undergradStudents?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  yearFounded?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  yearlyTuition?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutAthletesProspectedInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athletes?: InputMaybe<AthleteProfileUpdateManyWithoutSchoolNestedInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsUpdateManyWithoutSchoolNestedInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteUpdateManyWithoutSchoolNestedInput>;
  backgroundImage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coaches?: InputMaybe<CoachProfileUpdateManyWithoutSchoolNestedInput>;
  conference?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  division?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutSchoolNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  logo?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUpdateManyWithoutSchoolNestedInput>;
  primaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  schoolType?: InputMaybe<SchoolTypeUpdateOneRequiredWithoutSchoolsNestedInput>;
  secondaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  undergradStudents?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  yearFounded?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  yearlyTuition?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutAthletesRecruitedInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athletes?: InputMaybe<AthleteProfileUpdateManyWithoutSchoolNestedInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsUpdateManyWithoutSchoolNestedInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteUpdateManyWithoutSchoolNestedInput>;
  backgroundImage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coaches?: InputMaybe<CoachProfileUpdateManyWithoutSchoolNestedInput>;
  conference?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  division?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutSchoolNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  logo?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUpdateManyWithoutSchoolNestedInput>;
  primaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  schoolType?: InputMaybe<SchoolTypeUpdateOneRequiredWithoutSchoolsNestedInput>;
  secondaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  undergradStudents?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  yearFounded?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  yearlyTuition?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutCoachesInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athletes?: InputMaybe<AthleteProfileUpdateManyWithoutSchoolNestedInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsUpdateManyWithoutSchoolNestedInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteUpdateManyWithoutSchoolNestedInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteUpdateManyWithoutSchoolNestedInput>;
  backgroundImage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  conference?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  division?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutSchoolNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  logo?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUpdateManyWithoutSchoolNestedInput>;
  primaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  schoolType?: InputMaybe<SchoolTypeUpdateOneRequiredWithoutSchoolsNestedInput>;
  secondaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  undergradStudents?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  yearFounded?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  yearlyTuition?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutEvaluationsInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athletes?: InputMaybe<AthleteProfileUpdateManyWithoutSchoolNestedInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsUpdateManyWithoutSchoolNestedInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteUpdateManyWithoutSchoolNestedInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteUpdateManyWithoutSchoolNestedInput>;
  backgroundImage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coaches?: InputMaybe<CoachProfileUpdateManyWithoutSchoolNestedInput>;
  conference?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  division?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  logo?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUpdateManyWithoutSchoolNestedInput>;
  primaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  schoolType?: InputMaybe<SchoolTypeUpdateOneRequiredWithoutSchoolsNestedInput>;
  secondaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  undergradStudents?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  yearFounded?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  yearlyTuition?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutPostsInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athletes?: InputMaybe<AthleteProfileUpdateManyWithoutSchoolNestedInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsUpdateManyWithoutSchoolNestedInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteUpdateManyWithoutSchoolNestedInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteUpdateManyWithoutSchoolNestedInput>;
  backgroundImage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coaches?: InputMaybe<CoachProfileUpdateManyWithoutSchoolNestedInput>;
  conference?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  division?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutSchoolNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  logo?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  primaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  schoolType?: InputMaybe<SchoolTypeUpdateOneRequiredWithoutSchoolsNestedInput>;
  secondaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  undergradStudents?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  yearFounded?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  yearlyTuition?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutSchoolTypeInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athletes?: InputMaybe<AthleteProfileUpdateManyWithoutSchoolNestedInput>;
  athletesInterested?: InputMaybe<InterestedSchoolsUpdateManyWithoutSchoolNestedInput>;
  athletesProspected?: InputMaybe<ProspectedAthleteUpdateManyWithoutSchoolNestedInput>;
  athletesRecruited?: InputMaybe<RecruitedAthleteUpdateManyWithoutSchoolNestedInput>;
  backgroundImage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coaches?: InputMaybe<CoachProfileUpdateManyWithoutSchoolNestedInput>;
  conference?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  division?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluations?: InputMaybe<EvaluationUpdateManyWithoutSchoolNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  logo?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUpdateManyWithoutSchoolNestedInput>;
  primaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  secondaryColor?: InputMaybe<StringFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  undergradStudents?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  yearFounded?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  yearlyTuition?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SchoolUpsertWithWhereUniqueWithoutSchoolTypeInput = {
  create: SchoolCreateWithoutSchoolTypeInput;
  update: SchoolUpdateWithoutSchoolTypeInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolUpsertWithoutAthletesInput = {
  create: SchoolCreateWithoutAthletesInput;
  update: SchoolUpdateWithoutAthletesInput;
};

export type SchoolUpsertWithoutAthletesInterestedInput = {
  create: SchoolCreateWithoutAthletesInterestedInput;
  update: SchoolUpdateWithoutAthletesInterestedInput;
};

export type SchoolUpsertWithoutAthletesProspectedInput = {
  create: SchoolCreateWithoutAthletesProspectedInput;
  update: SchoolUpdateWithoutAthletesProspectedInput;
};

export type SchoolUpsertWithoutAthletesRecruitedInput = {
  create: SchoolCreateWithoutAthletesRecruitedInput;
  update: SchoolUpdateWithoutAthletesRecruitedInput;
};

export type SchoolUpsertWithoutCoachesInput = {
  create: SchoolCreateWithoutCoachesInput;
  update: SchoolUpdateWithoutCoachesInput;
};

export type SchoolUpsertWithoutEvaluationsInput = {
  create: SchoolCreateWithoutEvaluationsInput;
  update: SchoolUpdateWithoutEvaluationsInput;
};

export type SchoolUpsertWithoutPostsInput = {
  create: SchoolCreateWithoutPostsInput;
  update: SchoolUpdateWithoutPostsInput;
};

export type SchoolWhereInput = {
  AND?: InputMaybe<Array<SchoolWhereInput>>;
  NOT?: InputMaybe<Array<SchoolWhereInput>>;
  OR?: InputMaybe<Array<SchoolWhereInput>>;
  address?: InputMaybe<StringNullableFilter>;
  athletes?: InputMaybe<AthleteProfileListRelationFilter>;
  athletesInterested?: InputMaybe<InterestedSchoolsListRelationFilter>;
  athletesProspected?: InputMaybe<ProspectedAthleteListRelationFilter>;
  athletesRecruited?: InputMaybe<RecruitedAthleteListRelationFilter>;
  backgroundImage?: InputMaybe<StringNullableFilter>;
  city?: InputMaybe<StringNullableFilter>;
  coaches?: InputMaybe<CoachProfileListRelationFilter>;
  conference?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  division?: InputMaybe<StringNullableFilter>;
  email?: InputMaybe<StringFilter>;
  evaluations?: InputMaybe<EvaluationListRelationFilter>;
  id?: InputMaybe<BigIntFilter>;
  latitude?: InputMaybe<FloatNullableFilter>;
  logo?: InputMaybe<StringNullableFilter>;
  longitude?: InputMaybe<FloatNullableFilter>;
  name?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostListRelationFilter>;
  primaryColor?: InputMaybe<StringFilter>;
  radius?: InputMaybe<IntNullableFilter>;
  schoolType?: InputMaybe<SchoolTypeRelationFilter>;
  schoolTypeId?: InputMaybe<BigIntFilter>;
  secondaryColor?: InputMaybe<StringFilter>;
  state?: InputMaybe<StringNullableFilter>;
  undergradStudents?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
  yearFounded?: InputMaybe<StringNullableFilter>;
  yearlyTuition?: InputMaybe<StringNullableFilter>;
};

export type SchoolWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type SendPushNotificationToUserInput = {
  data?: InputMaybe<Scalars['JSONObject']['input']>;
  notification?: InputMaybe<Scalars['JSONObject']['input']>;
  title: Scalars['String']['input'];
};

export type SendPushNotificationToUserReturn = {
  __typename?: 'SendPushNotificationToUserReturn';
  sent: Scalars['Boolean']['output'];
};

export type SkillType = {
  __typename?: 'SkillType';
  _count?: Maybe<SkillTypeCount>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigInt']['output'];
  isPrimaryForRecruitment: Scalars['Boolean']['output'];
  mask: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  numberOfVideos: Scalars['Int']['output'];
  options: Array<Scalars['String']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  secondFieldName?: Maybe<Scalars['String']['output']>;
  secondValueOptions: Array<Scalars['String']['output']>;
  skills: Array<Skills>;
  unit: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
  videosLabels: Array<Scalars['String']['output']>;
};


export type SkillTypeSkillsArgs = {
  cursor?: InputMaybe<SkillsWhereUniqueInput>;
  distinct?: InputMaybe<Array<SkillsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SkillsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SkillsWhereInput>;
};

export type SkillTypeAvgAggregate = {
  __typename?: 'SkillTypeAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  numberOfVideos?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
};

export type SkillTypeAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  numberOfVideos?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
};

export type SkillTypeCount = {
  __typename?: 'SkillTypeCount';
  skills: Scalars['Int']['output'];
};

export type SkillTypeCountAggregate = {
  __typename?: 'SkillTypeCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  icon: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isPrimaryForRecruitment: Scalars['Int']['output'];
  mask: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  numberOfVideos: Scalars['Int']['output'];
  options: Scalars['Int']['output'];
  position: Scalars['Int']['output'];
  secondFieldName: Scalars['Int']['output'];
  secondValueOptions: Scalars['Int']['output'];
  unit: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
  videosLabels: Scalars['Int']['output'];
};

export type SkillTypeCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  icon?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isPrimaryForRecruitment?: InputMaybe<SortOrder>;
  mask?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  numberOfVideos?: InputMaybe<SortOrder>;
  options?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  secondFieldName?: InputMaybe<SortOrder>;
  secondValueOptions?: InputMaybe<SortOrder>;
  unit?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  videosLabels?: InputMaybe<SortOrder>;
};

export type SkillTypeCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  isPrimaryForRecruitment?: InputMaybe<Scalars['Boolean']['input']>;
  mask?: InputMaybe<SkillTypeCreatemaskInput>;
  name: Scalars['String']['input'];
  numberOfVideos?: InputMaybe<Scalars['Int']['input']>;
  options?: InputMaybe<SkillTypeCreateoptionsInput>;
  position?: InputMaybe<Scalars['Int']['input']>;
  secondFieldName?: InputMaybe<Scalars['String']['input']>;
  secondValueOptions?: InputMaybe<SkillTypeCreatesecondValueOptionsInput>;
  skills?: InputMaybe<SkillsCreateNestedManyWithoutSkillTypeInput>;
  unit: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  videosLabels?: InputMaybe<SkillTypeCreatevideosLabelsInput>;
};

export type SkillTypeCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  isPrimaryForRecruitment?: InputMaybe<Scalars['Boolean']['input']>;
  mask?: InputMaybe<SkillTypeCreatemaskInput>;
  name: Scalars['String']['input'];
  numberOfVideos?: InputMaybe<Scalars['Int']['input']>;
  options?: InputMaybe<SkillTypeCreateoptionsInput>;
  position?: InputMaybe<Scalars['Int']['input']>;
  secondFieldName?: InputMaybe<Scalars['String']['input']>;
  secondValueOptions?: InputMaybe<SkillTypeCreatesecondValueOptionsInput>;
  unit: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  videosLabels?: InputMaybe<SkillTypeCreatevideosLabelsInput>;
};

export type SkillTypeCreateNestedOneWithoutSkillsInput = {
  connect?: InputMaybe<SkillTypeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SkillTypeCreateOrConnectWithoutSkillsInput>;
  create?: InputMaybe<SkillTypeCreateWithoutSkillsInput>;
};

export type SkillTypeCreateOrConnectWithoutSkillsInput = {
  create: SkillTypeCreateWithoutSkillsInput;
  where: SkillTypeWhereUniqueInput;
};

export type SkillTypeCreateWithoutSkillsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  isPrimaryForRecruitment?: InputMaybe<Scalars['Boolean']['input']>;
  mask?: InputMaybe<SkillTypeCreatemaskInput>;
  name: Scalars['String']['input'];
  numberOfVideos?: InputMaybe<Scalars['Int']['input']>;
  options?: InputMaybe<SkillTypeCreateoptionsInput>;
  position?: InputMaybe<Scalars['Int']['input']>;
  secondFieldName?: InputMaybe<Scalars['String']['input']>;
  secondValueOptions?: InputMaybe<SkillTypeCreatesecondValueOptionsInput>;
  unit: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  videosLabels?: InputMaybe<SkillTypeCreatevideosLabelsInput>;
};

export type SkillTypeCreatemaskInput = {
  set: Array<Scalars['String']['input']>;
};

export type SkillTypeCreateoptionsInput = {
  set: Array<Scalars['String']['input']>;
};

export type SkillTypeCreatesecondValueOptionsInput = {
  set: Array<Scalars['String']['input']>;
};

export type SkillTypeCreatevideosLabelsInput = {
  set: Array<Scalars['String']['input']>;
};

export type SkillTypeGroupBy = {
  __typename?: 'SkillTypeGroupBy';
  _avg?: Maybe<SkillTypeAvgAggregate>;
  _count?: Maybe<SkillTypeCountAggregate>;
  _max?: Maybe<SkillTypeMaxAggregate>;
  _min?: Maybe<SkillTypeMinAggregate>;
  _sum?: Maybe<SkillTypeSumAggregate>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigInt']['output'];
  isPrimaryForRecruitment: Scalars['Boolean']['output'];
  mask?: Maybe<Array<Scalars['String']['output']>>;
  name: Scalars['String']['output'];
  numberOfVideos: Scalars['Int']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
  position?: Maybe<Scalars['Int']['output']>;
  secondFieldName?: Maybe<Scalars['String']['output']>;
  secondValueOptions?: Maybe<Array<Scalars['String']['output']>>;
  unit: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
  videosLabels?: Maybe<Array<Scalars['String']['output']>>;
};

export type SkillTypeMaxAggregate = {
  __typename?: 'SkillTypeMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  isPrimaryForRecruitment?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  numberOfVideos?: Maybe<Scalars['Int']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  secondFieldName?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type SkillTypeMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  icon?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isPrimaryForRecruitment?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  numberOfVideos?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  secondFieldName?: InputMaybe<SortOrder>;
  unit?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type SkillTypeMinAggregate = {
  __typename?: 'SkillTypeMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  isPrimaryForRecruitment?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  numberOfVideos?: Maybe<Scalars['Int']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  secondFieldName?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type SkillTypeMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  icon?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isPrimaryForRecruitment?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  numberOfVideos?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  secondFieldName?: InputMaybe<SortOrder>;
  unit?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type SkillTypeOrderByWithAggregationInput = {
  _avg?: InputMaybe<SkillTypeAvgOrderByAggregateInput>;
  _count?: InputMaybe<SkillTypeCountOrderByAggregateInput>;
  _max?: InputMaybe<SkillTypeMaxOrderByAggregateInput>;
  _min?: InputMaybe<SkillTypeMinOrderByAggregateInput>;
  _sum?: InputMaybe<SkillTypeSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  icon?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isPrimaryForRecruitment?: InputMaybe<SortOrder>;
  mask?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  numberOfVideos?: InputMaybe<SortOrder>;
  options?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  secondFieldName?: InputMaybe<SortOrder>;
  secondValueOptions?: InputMaybe<SortOrder>;
  unit?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  videosLabels?: InputMaybe<SortOrder>;
};

export type SkillTypeOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  icon?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isPrimaryForRecruitment?: InputMaybe<SortOrder>;
  mask?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  numberOfVideos?: InputMaybe<SortOrder>;
  options?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  secondFieldName?: InputMaybe<SortOrder>;
  secondValueOptions?: InputMaybe<SortOrder>;
  skills?: InputMaybe<SkillsOrderByRelationAggregateInput>;
  unit?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  videosLabels?: InputMaybe<SortOrder>;
};

export type SkillTypeRelationFilter = {
  is?: InputMaybe<SkillTypeWhereInput>;
  isNot?: InputMaybe<SkillTypeWhereInput>;
};

export enum SkillTypeScalarFieldEnum {
  CreatedAt = 'createdAt',
  Description = 'description',
  Icon = 'icon',
  Id = 'id',
  IsPrimaryForRecruitment = 'isPrimaryForRecruitment',
  Mask = 'mask',
  Name = 'name',
  NumberOfVideos = 'numberOfVideos',
  Options = 'options',
  Position = 'position',
  SecondFieldName = 'secondFieldName',
  SecondValueOptions = 'secondValueOptions',
  Unit = 'unit',
  UpdatedAt = 'updatedAt',
  Uuid = 'uuid',
  VideosLabels = 'videosLabels'
}

export type SkillTypeScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SkillTypeScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<SkillTypeScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SkillTypeScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  icon?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  isPrimaryForRecruitment?: InputMaybe<BoolWithAggregatesFilter>;
  mask?: InputMaybe<StringNullableListFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  numberOfVideos?: InputMaybe<IntWithAggregatesFilter>;
  options?: InputMaybe<StringNullableListFilter>;
  position?: InputMaybe<IntNullableWithAggregatesFilter>;
  secondFieldName?: InputMaybe<StringNullableWithAggregatesFilter>;
  secondValueOptions?: InputMaybe<StringNullableListFilter>;
  unit?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
  videosLabels?: InputMaybe<StringNullableListFilter>;
};

export type SkillTypeSumAggregate = {
  __typename?: 'SkillTypeSumAggregate';
  id?: Maybe<Scalars['BigInt']['output']>;
  numberOfVideos?: Maybe<Scalars['Int']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
};

export type SkillTypeSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  numberOfVideos?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
};

export type SkillTypeUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  icon?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  isPrimaryForRecruitment?: InputMaybe<BoolFieldUpdateOperationsInput>;
  mask?: InputMaybe<SkillTypeUpdatemaskInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  numberOfVideos?: InputMaybe<IntFieldUpdateOperationsInput>;
  options?: InputMaybe<SkillTypeUpdateoptionsInput>;
  position?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  secondFieldName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  secondValueOptions?: InputMaybe<SkillTypeUpdatesecondValueOptionsInput>;
  skills?: InputMaybe<SkillsUpdateManyWithoutSkillTypeNestedInput>;
  unit?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  videosLabels?: InputMaybe<SkillTypeUpdatevideosLabelsInput>;
};

export type SkillTypeUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  icon?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  isPrimaryForRecruitment?: InputMaybe<BoolFieldUpdateOperationsInput>;
  mask?: InputMaybe<SkillTypeUpdatemaskInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  numberOfVideos?: InputMaybe<IntFieldUpdateOperationsInput>;
  options?: InputMaybe<SkillTypeUpdateoptionsInput>;
  position?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  secondFieldName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  secondValueOptions?: InputMaybe<SkillTypeUpdatesecondValueOptionsInput>;
  unit?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  videosLabels?: InputMaybe<SkillTypeUpdatevideosLabelsInput>;
};

export type SkillTypeUpdateOneRequiredWithoutSkillsNestedInput = {
  connect?: InputMaybe<SkillTypeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SkillTypeCreateOrConnectWithoutSkillsInput>;
  create?: InputMaybe<SkillTypeCreateWithoutSkillsInput>;
  update?: InputMaybe<SkillTypeUpdateWithoutSkillsInput>;
  upsert?: InputMaybe<SkillTypeUpsertWithoutSkillsInput>;
};

export type SkillTypeUpdateWithoutSkillsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  icon?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  isPrimaryForRecruitment?: InputMaybe<BoolFieldUpdateOperationsInput>;
  mask?: InputMaybe<SkillTypeUpdatemaskInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  numberOfVideos?: InputMaybe<IntFieldUpdateOperationsInput>;
  options?: InputMaybe<SkillTypeUpdateoptionsInput>;
  position?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  secondFieldName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  secondValueOptions?: InputMaybe<SkillTypeUpdatesecondValueOptionsInput>;
  unit?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
  videosLabels?: InputMaybe<SkillTypeUpdatevideosLabelsInput>;
};

export type SkillTypeUpdatemaskInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SkillTypeUpdateoptionsInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SkillTypeUpdatesecondValueOptionsInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SkillTypeUpdatevideosLabelsInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SkillTypeUpsertWithoutSkillsInput = {
  create: SkillTypeCreateWithoutSkillsInput;
  update: SkillTypeUpdateWithoutSkillsInput;
};

export type SkillTypeWhereInput = {
  AND?: InputMaybe<Array<SkillTypeWhereInput>>;
  NOT?: InputMaybe<Array<SkillTypeWhereInput>>;
  OR?: InputMaybe<Array<SkillTypeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  icon?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<BigIntFilter>;
  isPrimaryForRecruitment?: InputMaybe<BoolFilter>;
  mask?: InputMaybe<StringNullableListFilter>;
  name?: InputMaybe<StringFilter>;
  numberOfVideos?: InputMaybe<IntFilter>;
  options?: InputMaybe<StringNullableListFilter>;
  position?: InputMaybe<IntNullableFilter>;
  secondFieldName?: InputMaybe<StringNullableFilter>;
  secondValueOptions?: InputMaybe<StringNullableListFilter>;
  skills?: InputMaybe<SkillsListRelationFilter>;
  unit?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
  videosLabels?: InputMaybe<StringNullableListFilter>;
};

export type SkillTypeWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type Skills = {
  __typename?: 'Skills';
  athlete?: Maybe<AthleteProfile>;
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  secondValue?: Maybe<Scalars['String']['output']>;
  skillId: Scalars['BigInt']['output'];
  skillType: SkillType;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
  verifiedAt?: Maybe<Scalars['DateTime']['output']>;
  videos: Array<Scalars['String']['output']>;
};

export type SkillsAthleteIdSkillIdCompoundUniqueInput = {
  athleteId: Scalars['BigInt']['input'];
  skillId: Scalars['BigInt']['input'];
};

export type SkillsAvgAggregate = {
  __typename?: 'SkillsAvgAggregate';
  athleteId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  skillId?: Maybe<Scalars['Float']['output']>;
};

export type SkillsAvgOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  skillId?: InputMaybe<SortOrder>;
};

export type SkillsCountAggregate = {
  __typename?: 'SkillsCountAggregate';
  _all: Scalars['Int']['output'];
  athleteId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  secondValue: Scalars['Int']['output'];
  skillId: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
  verified: Scalars['Int']['output'];
  verifiedAt: Scalars['Int']['output'];
  videos: Scalars['Int']['output'];
};

export type SkillsCountOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  secondValue?: InputMaybe<SortOrder>;
  skillId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
  verified?: InputMaybe<SortOrder>;
  verifiedAt?: InputMaybe<SortOrder>;
  videos?: InputMaybe<SortOrder>;
};

export type SkillsCreateInput = {
  athlete?: InputMaybe<AthleteProfileCreateNestedOneWithoutSkillsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  secondValue?: InputMaybe<Scalars['String']['input']>;
  skillType: SkillTypeCreateNestedOneWithoutSkillsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  value: Scalars['String']['input'];
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<SkillsCreatevideosInput>;
};

export type SkillsCreateManyAthleteInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  secondValue?: InputMaybe<Scalars['String']['input']>;
  skillId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  value: Scalars['String']['input'];
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<SkillsCreatevideosInput>;
};

export type SkillsCreateManyAthleteInputEnvelope = {
  data: Array<SkillsCreateManyAthleteInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SkillsCreateManyInput = {
  athleteId?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  secondValue?: InputMaybe<Scalars['String']['input']>;
  skillId: Scalars['BigInt']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  value: Scalars['String']['input'];
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<SkillsCreatevideosInput>;
};

export type SkillsCreateManySkillTypeInput = {
  athleteId?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  secondValue?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  value: Scalars['String']['input'];
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<SkillsCreatevideosInput>;
};

export type SkillsCreateManySkillTypeInputEnvelope = {
  data: Array<SkillsCreateManySkillTypeInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SkillsCreateNestedManyWithoutAthleteInput = {
  connect?: InputMaybe<Array<SkillsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SkillsCreateOrConnectWithoutAthleteInput>>;
  create?: InputMaybe<Array<SkillsCreateWithoutAthleteInput>>;
  createMany?: InputMaybe<SkillsCreateManyAthleteInputEnvelope>;
};

export type SkillsCreateNestedManyWithoutSkillTypeInput = {
  connect?: InputMaybe<Array<SkillsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SkillsCreateOrConnectWithoutSkillTypeInput>>;
  create?: InputMaybe<Array<SkillsCreateWithoutSkillTypeInput>>;
  createMany?: InputMaybe<SkillsCreateManySkillTypeInputEnvelope>;
};

export type SkillsCreateOrConnectWithoutAthleteInput = {
  create: SkillsCreateWithoutAthleteInput;
  where: SkillsWhereUniqueInput;
};

export type SkillsCreateOrConnectWithoutSkillTypeInput = {
  create: SkillsCreateWithoutSkillTypeInput;
  where: SkillsWhereUniqueInput;
};

export type SkillsCreateWithoutAthleteInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  secondValue?: InputMaybe<Scalars['String']['input']>;
  skillType: SkillTypeCreateNestedOneWithoutSkillsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  value: Scalars['String']['input'];
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<SkillsCreatevideosInput>;
};

export type SkillsCreateWithoutSkillTypeInput = {
  athlete?: InputMaybe<AthleteProfileCreateNestedOneWithoutSkillsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  secondValue?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  value: Scalars['String']['input'];
  verified?: InputMaybe<Scalars['Boolean']['input']>;
  verifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<SkillsCreatevideosInput>;
};

export type SkillsCreatevideosInput = {
  set: Array<Scalars['String']['input']>;
};

export type SkillsGroupBy = {
  __typename?: 'SkillsGroupBy';
  _avg?: Maybe<SkillsAvgAggregate>;
  _count?: Maybe<SkillsCountAggregate>;
  _max?: Maybe<SkillsMaxAggregate>;
  _min?: Maybe<SkillsMinAggregate>;
  _sum?: Maybe<SkillsSumAggregate>;
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  secondValue?: Maybe<Scalars['String']['output']>;
  skillId: Scalars['BigInt']['output'];
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
  verifiedAt?: Maybe<Scalars['DateTime']['output']>;
  videos?: Maybe<Array<Scalars['String']['output']>>;
};

export type SkillsListRelationFilter = {
  every?: InputMaybe<SkillsWhereInput>;
  none?: InputMaybe<SkillsWhereInput>;
  some?: InputMaybe<SkillsWhereInput>;
};

export type SkillsMaxAggregate = {
  __typename?: 'SkillsMaxAggregate';
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  secondValue?: Maybe<Scalars['String']['output']>;
  skillId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  value?: Maybe<Scalars['String']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
  verifiedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SkillsMaxOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  secondValue?: InputMaybe<SortOrder>;
  skillId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
  verified?: InputMaybe<SortOrder>;
  verifiedAt?: InputMaybe<SortOrder>;
};

export type SkillsMinAggregate = {
  __typename?: 'SkillsMinAggregate';
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  secondValue?: Maybe<Scalars['String']['output']>;
  skillId?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  value?: Maybe<Scalars['String']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
  verifiedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SkillsMinOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  secondValue?: InputMaybe<SortOrder>;
  skillId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
  verified?: InputMaybe<SortOrder>;
  verifiedAt?: InputMaybe<SortOrder>;
};

export type SkillsOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type SkillsOrderByWithAggregationInput = {
  _avg?: InputMaybe<SkillsAvgOrderByAggregateInput>;
  _count?: InputMaybe<SkillsCountOrderByAggregateInput>;
  _max?: InputMaybe<SkillsMaxOrderByAggregateInput>;
  _min?: InputMaybe<SkillsMinOrderByAggregateInput>;
  _sum?: InputMaybe<SkillsSumOrderByAggregateInput>;
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  secondValue?: InputMaybe<SortOrder>;
  skillId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
  verified?: InputMaybe<SortOrder>;
  verifiedAt?: InputMaybe<SortOrder>;
  videos?: InputMaybe<SortOrder>;
};

export type SkillsOrderByWithRelationInput = {
  athlete?: InputMaybe<AthleteProfileOrderByWithRelationInput>;
  athleteId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  secondValue?: InputMaybe<SortOrder>;
  skillId?: InputMaybe<SortOrder>;
  skillType?: InputMaybe<SkillTypeOrderByWithRelationInput>;
  updatedAt?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
  verified?: InputMaybe<SortOrder>;
  verifiedAt?: InputMaybe<SortOrder>;
  videos?: InputMaybe<SortOrder>;
};

export enum SkillsScalarFieldEnum {
  AthleteId = 'athleteId',
  CreatedAt = 'createdAt',
  Id = 'id',
  SecondValue = 'secondValue',
  SkillId = 'skillId',
  UpdatedAt = 'updatedAt',
  Value = 'value',
  Verified = 'verified',
  VerifiedAt = 'verifiedAt',
  Videos = 'videos'
}

export type SkillsScalarWhereInput = {
  AND?: InputMaybe<Array<SkillsScalarWhereInput>>;
  NOT?: InputMaybe<Array<SkillsScalarWhereInput>>;
  OR?: InputMaybe<Array<SkillsScalarWhereInput>>;
  athleteId?: InputMaybe<BigIntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  secondValue?: InputMaybe<StringNullableFilter>;
  skillId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  value?: InputMaybe<StringFilter>;
  verified?: InputMaybe<BoolFilter>;
  verifiedAt?: InputMaybe<DateTimeNullableFilter>;
  videos?: InputMaybe<StringNullableListFilter>;
};

export type SkillsScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SkillsScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<SkillsScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SkillsScalarWhereWithAggregatesInput>>;
  athleteId?: InputMaybe<BigIntNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  secondValue?: InputMaybe<StringNullableWithAggregatesFilter>;
  skillId?: InputMaybe<BigIntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  value?: InputMaybe<StringWithAggregatesFilter>;
  verified?: InputMaybe<BoolWithAggregatesFilter>;
  verifiedAt?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  videos?: InputMaybe<StringNullableListFilter>;
};

export type SkillsSumAggregate = {
  __typename?: 'SkillsSumAggregate';
  athleteId?: Maybe<Scalars['BigInt']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  skillId?: Maybe<Scalars['BigInt']['output']>;
};

export type SkillsSumOrderByAggregateInput = {
  athleteId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  skillId?: InputMaybe<SortOrder>;
};

export type SkillsUpdateInput = {
  athlete?: InputMaybe<AthleteProfileUpdateOneWithoutSkillsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  secondValue?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  skillType?: InputMaybe<SkillTypeUpdateOneRequiredWithoutSkillsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  value?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  videos?: InputMaybe<SkillsUpdatevideosInput>;
};

export type SkillsUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  secondValue?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  value?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  videos?: InputMaybe<SkillsUpdatevideosInput>;
};

export type SkillsUpdateManyWithWhereWithoutAthleteInput = {
  data: SkillsUpdateManyMutationInput;
  where: SkillsScalarWhereInput;
};

export type SkillsUpdateManyWithWhereWithoutSkillTypeInput = {
  data: SkillsUpdateManyMutationInput;
  where: SkillsScalarWhereInput;
};

export type SkillsUpdateManyWithoutAthleteNestedInput = {
  connect?: InputMaybe<Array<SkillsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SkillsCreateOrConnectWithoutAthleteInput>>;
  create?: InputMaybe<Array<SkillsCreateWithoutAthleteInput>>;
  createMany?: InputMaybe<SkillsCreateManyAthleteInputEnvelope>;
  delete?: InputMaybe<Array<SkillsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SkillsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SkillsWhereUniqueInput>>;
  set?: InputMaybe<Array<SkillsWhereUniqueInput>>;
  update?: InputMaybe<Array<SkillsUpdateWithWhereUniqueWithoutAthleteInput>>;
  updateMany?: InputMaybe<Array<SkillsUpdateManyWithWhereWithoutAthleteInput>>;
  upsert?: InputMaybe<Array<SkillsUpsertWithWhereUniqueWithoutAthleteInput>>;
};

export type SkillsUpdateManyWithoutSkillTypeNestedInput = {
  connect?: InputMaybe<Array<SkillsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SkillsCreateOrConnectWithoutSkillTypeInput>>;
  create?: InputMaybe<Array<SkillsCreateWithoutSkillTypeInput>>;
  createMany?: InputMaybe<SkillsCreateManySkillTypeInputEnvelope>;
  delete?: InputMaybe<Array<SkillsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SkillsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SkillsWhereUniqueInput>>;
  set?: InputMaybe<Array<SkillsWhereUniqueInput>>;
  update?: InputMaybe<Array<SkillsUpdateWithWhereUniqueWithoutSkillTypeInput>>;
  updateMany?: InputMaybe<Array<SkillsUpdateManyWithWhereWithoutSkillTypeInput>>;
  upsert?: InputMaybe<Array<SkillsUpsertWithWhereUniqueWithoutSkillTypeInput>>;
};

export type SkillsUpdateWithWhereUniqueWithoutAthleteInput = {
  data: SkillsUpdateWithoutAthleteInput;
  where: SkillsWhereUniqueInput;
};

export type SkillsUpdateWithWhereUniqueWithoutSkillTypeInput = {
  data: SkillsUpdateWithoutSkillTypeInput;
  where: SkillsWhereUniqueInput;
};

export type SkillsUpdateWithoutAthleteInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  secondValue?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  skillType?: InputMaybe<SkillTypeUpdateOneRequiredWithoutSkillsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  value?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  videos?: InputMaybe<SkillsUpdatevideosInput>;
};

export type SkillsUpdateWithoutSkillTypeInput = {
  athlete?: InputMaybe<AthleteProfileUpdateOneWithoutSkillsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  secondValue?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  value?: InputMaybe<StringFieldUpdateOperationsInput>;
  verified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  verifiedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  videos?: InputMaybe<SkillsUpdatevideosInput>;
};

export type SkillsUpdatevideosInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SkillsUpsertWithWhereUniqueWithoutAthleteInput = {
  create: SkillsCreateWithoutAthleteInput;
  update: SkillsUpdateWithoutAthleteInput;
  where: SkillsWhereUniqueInput;
};

export type SkillsUpsertWithWhereUniqueWithoutSkillTypeInput = {
  create: SkillsCreateWithoutSkillTypeInput;
  update: SkillsUpdateWithoutSkillTypeInput;
  where: SkillsWhereUniqueInput;
};

export type SkillsWhereInput = {
  AND?: InputMaybe<Array<SkillsWhereInput>>;
  NOT?: InputMaybe<Array<SkillsWhereInput>>;
  OR?: InputMaybe<Array<SkillsWhereInput>>;
  athlete?: InputMaybe<AthleteProfileRelationFilter>;
  athleteId?: InputMaybe<BigIntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  secondValue?: InputMaybe<StringNullableFilter>;
  skillId?: InputMaybe<BigIntFilter>;
  skillType?: InputMaybe<SkillTypeRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  value?: InputMaybe<StringFilter>;
  verified?: InputMaybe<BoolFilter>;
  verifiedAt?: InputMaybe<DateTimeNullableFilter>;
  videos?: InputMaybe<StringNullableListFilter>;
};

export type SkillsWhereUniqueInput = {
  athleteId_skillId?: InputMaybe<SkillsAthleteIdSkillIdCompoundUniqueInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']['input']>>;
  has?: InputMaybe<Scalars['String']['input']>;
  hasEvery?: InputMaybe<Array<Scalars['String']['input']>>;
  hasSome?: InputMaybe<Array<Scalars['String']['input']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type StringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Transcripts = {
  __typename?: 'Transcripts';
  athleteProfile?: Maybe<AthleteProfile>;
  athleteProfileId?: Maybe<Scalars['BigInt']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type TranscriptsAvgAggregate = {
  __typename?: 'TranscriptsAvgAggregate';
  athleteProfileId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type TranscriptsAvgOrderByAggregateInput = {
  athleteProfileId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type TranscriptsCountAggregate = {
  __typename?: 'TranscriptsCountAggregate';
  _all: Scalars['Int']['output'];
  athleteProfileId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  url: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type TranscriptsCountOrderByAggregateInput = {
  athleteProfileId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type TranscriptsCreateInput = {
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutTranscriptsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  url: Scalars['String']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type TranscriptsCreateManyAthleteProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  url: Scalars['String']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type TranscriptsCreateManyAthleteProfileInputEnvelope = {
  data: Array<TranscriptsCreateManyAthleteProfileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TranscriptsCreateManyInput = {
  athleteProfileId?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  url: Scalars['String']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type TranscriptsCreateNestedManyWithoutAthleteProfileInput = {
  connect?: InputMaybe<Array<TranscriptsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TranscriptsCreateOrConnectWithoutAthleteProfileInput>>;
  create?: InputMaybe<Array<TranscriptsCreateWithoutAthleteProfileInput>>;
  createMany?: InputMaybe<TranscriptsCreateManyAthleteProfileInputEnvelope>;
};

export type TranscriptsCreateOrConnectWithoutAthleteProfileInput = {
  create: TranscriptsCreateWithoutAthleteProfileInput;
  where: TranscriptsWhereUniqueInput;
};

export type TranscriptsCreateWithoutAthleteProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  url: Scalars['String']['input'];
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type TranscriptsGroupBy = {
  __typename?: 'TranscriptsGroupBy';
  _avg?: Maybe<TranscriptsAvgAggregate>;
  _count?: Maybe<TranscriptsCountAggregate>;
  _max?: Maybe<TranscriptsMaxAggregate>;
  _min?: Maybe<TranscriptsMinAggregate>;
  _sum?: Maybe<TranscriptsSumAggregate>;
  athleteProfileId?: Maybe<Scalars['BigInt']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type TranscriptsListRelationFilter = {
  every?: InputMaybe<TranscriptsWhereInput>;
  none?: InputMaybe<TranscriptsWhereInput>;
  some?: InputMaybe<TranscriptsWhereInput>;
};

export type TranscriptsMaxAggregate = {
  __typename?: 'TranscriptsMaxAggregate';
  athleteProfileId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type TranscriptsMaxOrderByAggregateInput = {
  athleteProfileId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type TranscriptsMinAggregate = {
  __typename?: 'TranscriptsMinAggregate';
  athleteProfileId?: Maybe<Scalars['BigInt']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type TranscriptsMinOrderByAggregateInput = {
  athleteProfileId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type TranscriptsOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TranscriptsOrderByWithAggregationInput = {
  _avg?: InputMaybe<TranscriptsAvgOrderByAggregateInput>;
  _count?: InputMaybe<TranscriptsCountOrderByAggregateInput>;
  _max?: InputMaybe<TranscriptsMaxOrderByAggregateInput>;
  _min?: InputMaybe<TranscriptsMinOrderByAggregateInput>;
  _sum?: InputMaybe<TranscriptsSumOrderByAggregateInput>;
  athleteProfileId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type TranscriptsOrderByWithRelationInput = {
  athleteProfile?: InputMaybe<AthleteProfileOrderByWithRelationInput>;
  athleteProfileId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export enum TranscriptsScalarFieldEnum {
  AthleteProfileId = 'athleteProfileId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt',
  Url = 'url',
  Uuid = 'uuid'
}

export type TranscriptsScalarWhereInput = {
  AND?: InputMaybe<Array<TranscriptsScalarWhereInput>>;
  NOT?: InputMaybe<Array<TranscriptsScalarWhereInput>>;
  OR?: InputMaybe<Array<TranscriptsScalarWhereInput>>;
  athleteProfileId?: InputMaybe<BigIntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type TranscriptsScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TranscriptsScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<TranscriptsScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TranscriptsScalarWhereWithAggregatesInput>>;
  athleteProfileId?: InputMaybe<BigIntNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  url?: InputMaybe<StringWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
};

export type TranscriptsSumAggregate = {
  __typename?: 'TranscriptsSumAggregate';
  athleteProfileId?: Maybe<Scalars['BigInt']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
};

export type TranscriptsSumOrderByAggregateInput = {
  athleteProfileId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type TranscriptsUpdateInput = {
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutTranscriptsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TranscriptsUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TranscriptsUpdateManyWithWhereWithoutAthleteProfileInput = {
  data: TranscriptsUpdateManyMutationInput;
  where: TranscriptsScalarWhereInput;
};

export type TranscriptsUpdateManyWithoutAthleteProfileNestedInput = {
  connect?: InputMaybe<Array<TranscriptsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TranscriptsCreateOrConnectWithoutAthleteProfileInput>>;
  create?: InputMaybe<Array<TranscriptsCreateWithoutAthleteProfileInput>>;
  createMany?: InputMaybe<TranscriptsCreateManyAthleteProfileInputEnvelope>;
  delete?: InputMaybe<Array<TranscriptsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TranscriptsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TranscriptsWhereUniqueInput>>;
  set?: InputMaybe<Array<TranscriptsWhereUniqueInput>>;
  update?: InputMaybe<Array<TranscriptsUpdateWithWhereUniqueWithoutAthleteProfileInput>>;
  updateMany?: InputMaybe<Array<TranscriptsUpdateManyWithWhereWithoutAthleteProfileInput>>;
  upsert?: InputMaybe<Array<TranscriptsUpsertWithWhereUniqueWithoutAthleteProfileInput>>;
};

export type TranscriptsUpdateWithWhereUniqueWithoutAthleteProfileInput = {
  data: TranscriptsUpdateWithoutAthleteProfileInput;
  where: TranscriptsWhereUniqueInput;
};

export type TranscriptsUpdateWithoutAthleteProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TranscriptsUpsertWithWhereUniqueWithoutAthleteProfileInput = {
  create: TranscriptsCreateWithoutAthleteProfileInput;
  update: TranscriptsUpdateWithoutAthleteProfileInput;
  where: TranscriptsWhereUniqueInput;
};

export type TranscriptsWhereInput = {
  AND?: InputMaybe<Array<TranscriptsWhereInput>>;
  NOT?: InputMaybe<Array<TranscriptsWhereInput>>;
  OR?: InputMaybe<Array<TranscriptsWhereInput>>;
  athleteProfile?: InputMaybe<AthleteProfileRelationFilter>;
  athleteProfileId?: InputMaybe<BigIntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type TranscriptsWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserFcmTokenInput = {
  fcmToken: Scalars['String']['input'];
};

export type UpdateUserFcmTokenReturn = {
  __typename?: 'UpdateUserFcmTokenReturn';
  success: Scalars['Boolean']['output'];
  user: User;
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  accountType: AccountType;
  accountTypeId: Scalars['BigInt']['output'];
  address?: Maybe<Scalars['String']['output']>;
  athleteProfile?: Maybe<AthleteProfile>;
  avatar?: Maybe<Scalars['String']['output']>;
  blockedByUsers: Array<Blocks>;
  blockedUsers: Array<Blocks>;
  city?: Maybe<Scalars['String']['output']>;
  coachProfile?: Maybe<CoachProfile>;
  commentLikes: Array<CommentLike>;
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  dob?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  evaluationsCreated: Array<Evaluation>;
  fcmToken?: Maybe<Scalars['String']['output']>;
  firebaseUid: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  followedBy: Array<Follows>;
  following: Array<Follows>;
  id: Scalars['BigInt']['output'];
  interestedSchools: Array<InterestedSchools>;
  isActive: Scalars['Boolean']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  postFlag: Array<PostFlag>;
  postLikes: Array<PostLike>;
  postReports: Array<PostReport>;
  posts: Array<Post>;
  prospectedSchools: Array<ProspectedAthlete>;
  radius?: Maybe<Scalars['Int']['output']>;
  recruitedSchools: Array<RecruitedAthlete>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['BigInt']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  surname: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['String']['output'];
};


export type UserBlockedByUsersArgs = {
  cursor?: InputMaybe<BlocksWhereUniqueInput>;
  distinct?: InputMaybe<Array<BlocksScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BlocksOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BlocksWhereInput>;
};


export type UserBlockedUsersArgs = {
  cursor?: InputMaybe<BlocksWhereUniqueInput>;
  distinct?: InputMaybe<Array<BlocksScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BlocksOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BlocksWhereInput>;
};


export type UserCommentLikesArgs = {
  cursor?: InputMaybe<CommentLikeWhereUniqueInput>;
  distinct?: InputMaybe<Array<CommentLikeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CommentLikeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentLikeWhereInput>;
};


export type UserCommentsArgs = {
  cursor?: InputMaybe<CommentWhereUniqueInput>;
  distinct?: InputMaybe<Array<CommentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CommentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentWhereInput>;
};


export type UserEvaluationsCreatedArgs = {
  cursor?: InputMaybe<EvaluationWhereUniqueInput>;
  distinct?: InputMaybe<Array<EvaluationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EvaluationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EvaluationWhereInput>;
};


export type UserFollowedByArgs = {
  cursor?: InputMaybe<FollowsWhereUniqueInput>;
  distinct?: InputMaybe<Array<FollowsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FollowsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowsWhereInput>;
};


export type UserFollowingArgs = {
  cursor?: InputMaybe<FollowsWhereUniqueInput>;
  distinct?: InputMaybe<Array<FollowsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FollowsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowsWhereInput>;
};


export type UserInterestedSchoolsArgs = {
  cursor?: InputMaybe<InterestedSchoolsWhereUniqueInput>;
  distinct?: InputMaybe<Array<InterestedSchoolsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InterestedSchoolsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<InterestedSchoolsWhereInput>;
};


export type UserPostFlagArgs = {
  cursor?: InputMaybe<PostFlagWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostFlagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostFlagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostFlagWhereInput>;
};


export type UserPostLikesArgs = {
  cursor?: InputMaybe<PostLikeWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostLikeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostLikeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostLikeWhereInput>;
};


export type UserPostReportsArgs = {
  cursor?: InputMaybe<PostReportWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostReportScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostReportOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostReportWhereInput>;
};


export type UserPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostWhereInput>;
};


export type UserProspectedSchoolsArgs = {
  cursor?: InputMaybe<ProspectedAthleteWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProspectedAthleteScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProspectedAthleteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProspectedAthleteWhereInput>;
};


export type UserRecruitedSchoolsArgs = {
  cursor?: InputMaybe<RecruitedAthleteWhereUniqueInput>;
  distinct?: InputMaybe<Array<RecruitedAthleteScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RecruitedAthleteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RecruitedAthleteWhereInput>;
};

export type UserAvgAggregate = {
  __typename?: 'UserAvgAggregate';
  accountTypeId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  roleId?: Maybe<Scalars['Float']['output']>;
};

export type UserAvgOrderByAggregateInput = {
  accountTypeId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  radius?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
};

export type UserCount = {
  __typename?: 'UserCount';
  blockedByUsers: Scalars['Int']['output'];
  blockedUsers: Scalars['Int']['output'];
  commentLikes: Scalars['Int']['output'];
  comments: Scalars['Int']['output'];
  evaluationsCreated: Scalars['Int']['output'];
  followedBy: Scalars['Int']['output'];
  following: Scalars['Int']['output'];
  interestedSchools: Scalars['Int']['output'];
  postFlag: Scalars['Int']['output'];
  postLikes: Scalars['Int']['output'];
  postReports: Scalars['Int']['output'];
  posts: Scalars['Int']['output'];
  prospectedSchools: Scalars['Int']['output'];
  recruitedSchools: Scalars['Int']['output'];
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int']['output'];
  accountTypeId: Scalars['Int']['output'];
  address: Scalars['Int']['output'];
  avatar: Scalars['Int']['output'];
  city: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  dob: Scalars['Int']['output'];
  email: Scalars['Int']['output'];
  fcmToken: Scalars['Int']['output'];
  firebaseUid: Scalars['Int']['output'];
  firstname: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Int']['output'];
  latitude: Scalars['Int']['output'];
  longitude: Scalars['Int']['output'];
  radius: Scalars['Int']['output'];
  roleId: Scalars['Int']['output'];
  state: Scalars['Int']['output'];
  surname: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  username: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type UserCountOrderByAggregateInput = {
  accountTypeId?: InputMaybe<SortOrder>;
  address?: InputMaybe<SortOrder>;
  avatar?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  dob?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  fcmToken?: InputMaybe<SortOrder>;
  firebaseUid?: InputMaybe<SortOrder>;
  firstname?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  radius?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  surname?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type UserCreateInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateManyAccountTypeInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  roleId?: InputMaybe<Scalars['BigInt']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateManyAccountTypeInputEnvelope = {
  data: Array<UserCreateManyAccountTypeInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserCreateManyInput = {
  accountTypeId: Scalars['BigInt']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  roleId?: InputMaybe<Scalars['BigInt']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateManyRoleInput = {
  accountTypeId: Scalars['BigInt']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateManyRoleInputEnvelope = {
  data: Array<UserCreateManyRoleInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserCreateNestedManyWithoutAccountTypeInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutAccountTypeInput>>;
  create?: InputMaybe<Array<UserCreateWithoutAccountTypeInput>>;
  createMany?: InputMaybe<UserCreateManyAccountTypeInputEnvelope>;
};

export type UserCreateNestedManyWithoutRoleInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutRoleInput>>;
  create?: InputMaybe<Array<UserCreateWithoutRoleInput>>;
  createMany?: InputMaybe<UserCreateManyRoleInputEnvelope>;
};

export type UserCreateNestedOneWithoutAthleteProfileInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAthleteProfileInput>;
  create?: InputMaybe<UserCreateWithoutAthleteProfileInput>;
};

export type UserCreateNestedOneWithoutBlockedByUsersInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutBlockedByUsersInput>;
  create?: InputMaybe<UserCreateWithoutBlockedByUsersInput>;
};

export type UserCreateNestedOneWithoutBlockedUsersInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutBlockedUsersInput>;
  create?: InputMaybe<UserCreateWithoutBlockedUsersInput>;
};

export type UserCreateNestedOneWithoutCoachProfileInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCoachProfileInput>;
  create?: InputMaybe<UserCreateWithoutCoachProfileInput>;
};

export type UserCreateNestedOneWithoutCommentLikesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCommentLikesInput>;
  create?: InputMaybe<UserCreateWithoutCommentLikesInput>;
};

export type UserCreateNestedOneWithoutCommentsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<UserCreateWithoutCommentsInput>;
};

export type UserCreateNestedOneWithoutEvaluationsCreatedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutEvaluationsCreatedInput>;
  create?: InputMaybe<UserCreateWithoutEvaluationsCreatedInput>;
};

export type UserCreateNestedOneWithoutFollowedByInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutFollowedByInput>;
  create?: InputMaybe<UserCreateWithoutFollowedByInput>;
};

export type UserCreateNestedOneWithoutFollowingInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutFollowingInput>;
  create?: InputMaybe<UserCreateWithoutFollowingInput>;
};

export type UserCreateNestedOneWithoutInterestedSchoolsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutInterestedSchoolsInput>;
  create?: InputMaybe<UserCreateWithoutInterestedSchoolsInput>;
};

export type UserCreateNestedOneWithoutPostFlagInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostFlagInput>;
  create?: InputMaybe<UserCreateWithoutPostFlagInput>;
};

export type UserCreateNestedOneWithoutPostLikesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostLikesInput>;
  create?: InputMaybe<UserCreateWithoutPostLikesInput>;
};

export type UserCreateNestedOneWithoutPostReportsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostReportsInput>;
  create?: InputMaybe<UserCreateWithoutPostReportsInput>;
};

export type UserCreateNestedOneWithoutPostsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostsInput>;
  create?: InputMaybe<UserCreateWithoutPostsInput>;
};

export type UserCreateNestedOneWithoutProspectedSchoolsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutProspectedSchoolsInput>;
  create?: InputMaybe<UserCreateWithoutProspectedSchoolsInput>;
};

export type UserCreateNestedOneWithoutRecruitedSchoolsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutRecruitedSchoolsInput>;
  create?: InputMaybe<UserCreateWithoutRecruitedSchoolsInput>;
};

export type UserCreateOrConnectWithoutAccountTypeInput = {
  create: UserCreateWithoutAccountTypeInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutAthleteProfileInput = {
  create: UserCreateWithoutAthleteProfileInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutBlockedByUsersInput = {
  create: UserCreateWithoutBlockedByUsersInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutBlockedUsersInput = {
  create: UserCreateWithoutBlockedUsersInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutCoachProfileInput = {
  create: UserCreateWithoutCoachProfileInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutCommentLikesInput = {
  create: UserCreateWithoutCommentLikesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutCommentsInput = {
  create: UserCreateWithoutCommentsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutEvaluationsCreatedInput = {
  create: UserCreateWithoutEvaluationsCreatedInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutFollowedByInput = {
  create: UserCreateWithoutFollowedByInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutFollowingInput = {
  create: UserCreateWithoutFollowingInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutInterestedSchoolsInput = {
  create: UserCreateWithoutInterestedSchoolsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutPostFlagInput = {
  create: UserCreateWithoutPostFlagInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutPostLikesInput = {
  create: UserCreateWithoutPostLikesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutPostReportsInput = {
  create: UserCreateWithoutPostReportsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutPostsInput = {
  create: UserCreateWithoutPostsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutProspectedSchoolsInput = {
  create: UserCreateWithoutProspectedSchoolsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutRecruitedSchoolsInput = {
  create: UserCreateWithoutRecruitedSchoolsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutRoleInput = {
  create: UserCreateWithoutRoleInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutAccountTypeInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutAthleteProfileInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutBlockedByUsersInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutBlockedUsersInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutCoachProfileInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutCommentLikesInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutCommentsInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutEvaluationsCreatedInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutFollowedByInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutFollowingInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutInterestedSchoolsInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutPostFlagInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutPostLikesInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutPostReportsInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutPostsInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutProspectedSchoolsInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutRecruitedSchoolsInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<RoleCreateNestedOneWithoutUsersInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutRoleInput = {
  accountType: AccountTypeCreateNestedOneWithoutUsersInput;
  address?: InputMaybe<Scalars['String']['input']>;
  athleteProfile?: InputMaybe<AthleteProfileCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  blockedByUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedInput>;
  blockedUsers?: InputMaybe<BlocksCreateNestedManyWithoutBlockedByInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  coachProfile?: InputMaybe<CoachProfileCreateNestedOneWithoutUserInput>;
  commentLikes?: InputMaybe<CommentLikeCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  evaluationsCreated?: InputMaybe<EvaluationCreateNestedManyWithoutCreatedByInput>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  firebaseUid: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  followedBy?: InputMaybe<FollowsCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<FollowsCreateNestedManyWithoutFollowerInput>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  interestedSchools?: InputMaybe<InterestedSchoolsCreateNestedManyWithoutUserInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  postFlag?: InputMaybe<PostFlagCreateNestedManyWithoutUserInput>;
  postLikes?: InputMaybe<PostLikeCreateNestedManyWithoutUserInput>;
  postReports?: InputMaybe<PostReportCreateNestedManyWithoutUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteCreateNestedManyWithoutUserInput>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  recruitedSchools?: InputMaybe<RecruitedAthleteCreateNestedManyWithoutUserInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type UserGroupBy = {
  __typename?: 'UserGroupBy';
  _avg?: Maybe<UserAvgAggregate>;
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _sum?: Maybe<UserSumAggregate>;
  accountTypeId: Scalars['BigInt']['output'];
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dob?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  fcmToken?: Maybe<Scalars['String']['output']>;
  firebaseUid: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  isActive: Scalars['Boolean']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Int']['output']>;
  roleId?: Maybe<Scalars['BigInt']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  surname: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['String']['output'];
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  accountTypeId?: Maybe<Scalars['BigInt']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dob?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fcmToken?: Maybe<Scalars['String']['output']>;
  firebaseUid?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Int']['output']>;
  roleId?: Maybe<Scalars['BigInt']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  surname?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type UserMaxOrderByAggregateInput = {
  accountTypeId?: InputMaybe<SortOrder>;
  address?: InputMaybe<SortOrder>;
  avatar?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  dob?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  fcmToken?: InputMaybe<SortOrder>;
  firebaseUid?: InputMaybe<SortOrder>;
  firstname?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  radius?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  surname?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  accountTypeId?: Maybe<Scalars['BigInt']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dob?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fcmToken?: Maybe<Scalars['String']['output']>;
  firebaseUid?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Int']['output']>;
  roleId?: Maybe<Scalars['BigInt']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  surname?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type UserMinOrderByAggregateInput = {
  accountTypeId?: InputMaybe<SortOrder>;
  address?: InputMaybe<SortOrder>;
  avatar?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  dob?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  fcmToken?: InputMaybe<SortOrder>;
  firebaseUid?: InputMaybe<SortOrder>;
  firstname?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  radius?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  surname?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type UserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserOrderByWithAggregationInput = {
  _avg?: InputMaybe<UserAvgOrderByAggregateInput>;
  _count?: InputMaybe<UserCountOrderByAggregateInput>;
  _max?: InputMaybe<UserMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserMinOrderByAggregateInput>;
  _sum?: InputMaybe<UserSumOrderByAggregateInput>;
  accountTypeId?: InputMaybe<SortOrder>;
  address?: InputMaybe<SortOrder>;
  avatar?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  dob?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  fcmToken?: InputMaybe<SortOrder>;
  firebaseUid?: InputMaybe<SortOrder>;
  firstname?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  radius?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  surname?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  accountType?: InputMaybe<AccountTypeOrderByWithRelationInput>;
  accountTypeId?: InputMaybe<SortOrder>;
  address?: InputMaybe<SortOrder>;
  athleteProfile?: InputMaybe<AthleteProfileOrderByWithRelationInput>;
  avatar?: InputMaybe<SortOrder>;
  blockedByUsers?: InputMaybe<BlocksOrderByRelationAggregateInput>;
  blockedUsers?: InputMaybe<BlocksOrderByRelationAggregateInput>;
  city?: InputMaybe<SortOrder>;
  coachProfile?: InputMaybe<CoachProfileOrderByWithRelationInput>;
  commentLikes?: InputMaybe<CommentLikeOrderByRelationAggregateInput>;
  comments?: InputMaybe<CommentOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  dob?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  evaluationsCreated?: InputMaybe<EvaluationOrderByRelationAggregateInput>;
  fcmToken?: InputMaybe<SortOrder>;
  firebaseUid?: InputMaybe<SortOrder>;
  firstname?: InputMaybe<SortOrder>;
  followedBy?: InputMaybe<FollowsOrderByRelationAggregateInput>;
  following?: InputMaybe<FollowsOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  interestedSchools?: InputMaybe<InterestedSchoolsOrderByRelationAggregateInput>;
  isActive?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  postFlag?: InputMaybe<PostFlagOrderByRelationAggregateInput>;
  postLikes?: InputMaybe<PostLikeOrderByRelationAggregateInput>;
  postReports?: InputMaybe<PostReportOrderByRelationAggregateInput>;
  posts?: InputMaybe<PostOrderByRelationAggregateInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteOrderByRelationAggregateInput>;
  radius?: InputMaybe<SortOrder>;
  recruitedSchools?: InputMaybe<RecruitedAthleteOrderByRelationAggregateInput>;
  role?: InputMaybe<RoleOrderByWithRelationInput>;
  roleId?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  surname?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserScalarFieldEnum {
  AccountTypeId = 'accountTypeId',
  Address = 'address',
  Avatar = 'avatar',
  City = 'city',
  CreatedAt = 'createdAt',
  Dob = 'dob',
  Email = 'email',
  FcmToken = 'fcmToken',
  FirebaseUid = 'firebaseUid',
  Firstname = 'firstname',
  Id = 'id',
  IsActive = 'isActive',
  Latitude = 'latitude',
  Longitude = 'longitude',
  Radius = 'radius',
  RoleId = 'roleId',
  State = 'state',
  Surname = 'surname',
  UpdatedAt = 'updatedAt',
  Username = 'username',
  Uuid = 'uuid'
}

export type UserScalarWhereInput = {
  AND?: InputMaybe<Array<UserScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereInput>>;
  OR?: InputMaybe<Array<UserScalarWhereInput>>;
  accountTypeId?: InputMaybe<BigIntFilter>;
  address?: InputMaybe<StringNullableFilter>;
  avatar?: InputMaybe<StringNullableFilter>;
  city?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dob?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  fcmToken?: InputMaybe<StringNullableFilter>;
  firebaseUid?: InputMaybe<StringFilter>;
  firstname?: InputMaybe<StringFilter>;
  id?: InputMaybe<BigIntFilter>;
  isActive?: InputMaybe<BoolFilter>;
  latitude?: InputMaybe<FloatNullableFilter>;
  longitude?: InputMaybe<FloatNullableFilter>;
  radius?: InputMaybe<IntNullableFilter>;
  roleId?: InputMaybe<BigIntNullableFilter>;
  state?: InputMaybe<StringNullableFilter>;
  surname?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  username?: InputMaybe<StringNullableFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type UserScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  accountTypeId?: InputMaybe<BigIntWithAggregatesFilter>;
  address?: InputMaybe<StringNullableWithAggregatesFilter>;
  avatar?: InputMaybe<StringNullableWithAggregatesFilter>;
  city?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  dob?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  email?: InputMaybe<StringWithAggregatesFilter>;
  fcmToken?: InputMaybe<StringNullableWithAggregatesFilter>;
  firebaseUid?: InputMaybe<StringWithAggregatesFilter>;
  firstname?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<BigIntWithAggregatesFilter>;
  isActive?: InputMaybe<BoolWithAggregatesFilter>;
  latitude?: InputMaybe<FloatNullableWithAggregatesFilter>;
  longitude?: InputMaybe<FloatNullableWithAggregatesFilter>;
  radius?: InputMaybe<IntNullableWithAggregatesFilter>;
  roleId?: InputMaybe<BigIntNullableWithAggregatesFilter>;
  state?: InputMaybe<StringNullableWithAggregatesFilter>;
  surname?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  username?: InputMaybe<StringNullableWithAggregatesFilter>;
  uuid?: InputMaybe<StringWithAggregatesFilter>;
};

export type UserSumAggregate = {
  __typename?: 'UserSumAggregate';
  accountTypeId?: Maybe<Scalars['BigInt']['output']>;
  id?: Maybe<Scalars['BigInt']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Int']['output']>;
  roleId?: Maybe<Scalars['BigInt']['output']>;
};

export type UserSumOrderByAggregateInput = {
  accountTypeId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  radius?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
};

export type UserUpdateInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateManyMutationInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateManyWithWhereWithoutAccountTypeInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithWhereWithoutRoleInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithoutAccountTypeNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutAccountTypeInput>>;
  create?: InputMaybe<Array<UserCreateWithoutAccountTypeInput>>;
  createMany?: InputMaybe<UserCreateManyAccountTypeInputEnvelope>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutAccountTypeInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutAccountTypeInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutAccountTypeInput>>;
};

export type UserUpdateManyWithoutRoleNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutRoleInput>>;
  create?: InputMaybe<Array<UserCreateWithoutRoleInput>>;
  createMany?: InputMaybe<UserCreateManyRoleInputEnvelope>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutRoleInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutRoleInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutRoleInput>>;
};

export type UserUpdateOneRequiredWithoutAthleteProfileNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAthleteProfileInput>;
  create?: InputMaybe<UserCreateWithoutAthleteProfileInput>;
  update?: InputMaybe<UserUpdateWithoutAthleteProfileInput>;
  upsert?: InputMaybe<UserUpsertWithoutAthleteProfileInput>;
};

export type UserUpdateOneRequiredWithoutBlockedByUsersNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutBlockedByUsersInput>;
  create?: InputMaybe<UserCreateWithoutBlockedByUsersInput>;
  update?: InputMaybe<UserUpdateWithoutBlockedByUsersInput>;
  upsert?: InputMaybe<UserUpsertWithoutBlockedByUsersInput>;
};

export type UserUpdateOneRequiredWithoutBlockedUsersNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutBlockedUsersInput>;
  create?: InputMaybe<UserCreateWithoutBlockedUsersInput>;
  update?: InputMaybe<UserUpdateWithoutBlockedUsersInput>;
  upsert?: InputMaybe<UserUpsertWithoutBlockedUsersInput>;
};

export type UserUpdateOneRequiredWithoutCoachProfileNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCoachProfileInput>;
  create?: InputMaybe<UserCreateWithoutCoachProfileInput>;
  update?: InputMaybe<UserUpdateWithoutCoachProfileInput>;
  upsert?: InputMaybe<UserUpsertWithoutCoachProfileInput>;
};

export type UserUpdateOneRequiredWithoutCommentLikesNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCommentLikesInput>;
  create?: InputMaybe<UserCreateWithoutCommentLikesInput>;
  update?: InputMaybe<UserUpdateWithoutCommentLikesInput>;
  upsert?: InputMaybe<UserUpsertWithoutCommentLikesInput>;
};

export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<UserCreateWithoutCommentsInput>;
  update?: InputMaybe<UserUpdateWithoutCommentsInput>;
  upsert?: InputMaybe<UserUpsertWithoutCommentsInput>;
};

export type UserUpdateOneRequiredWithoutEvaluationsCreatedNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutEvaluationsCreatedInput>;
  create?: InputMaybe<UserCreateWithoutEvaluationsCreatedInput>;
  update?: InputMaybe<UserUpdateWithoutEvaluationsCreatedInput>;
  upsert?: InputMaybe<UserUpsertWithoutEvaluationsCreatedInput>;
};

export type UserUpdateOneRequiredWithoutFollowedByNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutFollowedByInput>;
  create?: InputMaybe<UserCreateWithoutFollowedByInput>;
  update?: InputMaybe<UserUpdateWithoutFollowedByInput>;
  upsert?: InputMaybe<UserUpsertWithoutFollowedByInput>;
};

export type UserUpdateOneRequiredWithoutFollowingNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutFollowingInput>;
  create?: InputMaybe<UserCreateWithoutFollowingInput>;
  update?: InputMaybe<UserUpdateWithoutFollowingInput>;
  upsert?: InputMaybe<UserUpsertWithoutFollowingInput>;
};

export type UserUpdateOneRequiredWithoutPostFlagNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostFlagInput>;
  create?: InputMaybe<UserCreateWithoutPostFlagInput>;
  update?: InputMaybe<UserUpdateWithoutPostFlagInput>;
  upsert?: InputMaybe<UserUpsertWithoutPostFlagInput>;
};

export type UserUpdateOneRequiredWithoutPostLikesNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostLikesInput>;
  create?: InputMaybe<UserCreateWithoutPostLikesInput>;
  update?: InputMaybe<UserUpdateWithoutPostLikesInput>;
  upsert?: InputMaybe<UserUpsertWithoutPostLikesInput>;
};

export type UserUpdateOneRequiredWithoutPostReportsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostReportsInput>;
  create?: InputMaybe<UserCreateWithoutPostReportsInput>;
  update?: InputMaybe<UserUpdateWithoutPostReportsInput>;
  upsert?: InputMaybe<UserUpsertWithoutPostReportsInput>;
};

export type UserUpdateOneRequiredWithoutPostsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostsInput>;
  create?: InputMaybe<UserCreateWithoutPostsInput>;
  update?: InputMaybe<UserUpdateWithoutPostsInput>;
  upsert?: InputMaybe<UserUpsertWithoutPostsInput>;
};

export type UserUpdateOneWithoutInterestedSchoolsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutInterestedSchoolsInput>;
  create?: InputMaybe<UserCreateWithoutInterestedSchoolsInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<UserUpdateWithoutInterestedSchoolsInput>;
  upsert?: InputMaybe<UserUpsertWithoutInterestedSchoolsInput>;
};

export type UserUpdateOneWithoutProspectedSchoolsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutProspectedSchoolsInput>;
  create?: InputMaybe<UserCreateWithoutProspectedSchoolsInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<UserUpdateWithoutProspectedSchoolsInput>;
  upsert?: InputMaybe<UserUpsertWithoutProspectedSchoolsInput>;
};

export type UserUpdateOneWithoutRecruitedSchoolsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutRecruitedSchoolsInput>;
  create?: InputMaybe<UserCreateWithoutRecruitedSchoolsInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<UserUpdateWithoutRecruitedSchoolsInput>;
  upsert?: InputMaybe<UserUpsertWithoutRecruitedSchoolsInput>;
};

export type UserUpdateWithWhereUniqueWithoutAccountTypeInput = {
  data: UserUpdateWithoutAccountTypeInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithWhereUniqueWithoutRoleInput = {
  data: UserUpdateWithoutRoleInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithoutAccountTypeInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutAthleteProfileInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutBlockedByUsersInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutBlockedUsersInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutCoachProfileInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutCommentLikesInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutCommentsInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutEvaluationsCreatedInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutFollowedByInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutFollowingInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutInterestedSchoolsInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutPostFlagInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutPostLikesInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutPostReportsInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutPostsInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutProspectedSchoolsInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutRecruitedSchoolsInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  role?: InputMaybe<RoleUpdateOneWithoutUsersNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutRoleInput = {
  accountType?: InputMaybe<AccountTypeUpdateOneRequiredWithoutUsersNestedInput>;
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  athleteProfile?: InputMaybe<AthleteProfileUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  blockedByUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedNestedInput>;
  blockedUsers?: InputMaybe<BlocksUpdateManyWithoutBlockedByNestedInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  coachProfile?: InputMaybe<CoachProfileUpdateOneWithoutUserNestedInput>;
  commentLikes?: InputMaybe<CommentLikeUpdateManyWithoutUserNestedInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dob?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  evaluationsCreated?: InputMaybe<EvaluationUpdateManyWithoutCreatedByNestedInput>;
  fcmToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firebaseUid?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<StringFieldUpdateOperationsInput>;
  followedBy?: InputMaybe<FollowsUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<FollowsUpdateManyWithoutFollowerNestedInput>;
  id?: InputMaybe<BigIntFieldUpdateOperationsInput>;
  interestedSchools?: InputMaybe<InterestedSchoolsUpdateManyWithoutUserNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  postFlag?: InputMaybe<PostFlagUpdateManyWithoutUserNestedInput>;
  postLikes?: InputMaybe<PostLikeUpdateManyWithoutUserNestedInput>;
  postReports?: InputMaybe<PostReportUpdateManyWithoutUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  prospectedSchools?: InputMaybe<ProspectedAthleteUpdateManyWithoutUserNestedInput>;
  radius?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recruitedSchools?: InputMaybe<RecruitedAthleteUpdateManyWithoutUserNestedInput>;
  state?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpsertWithWhereUniqueWithoutAccountTypeInput = {
  create: UserCreateWithoutAccountTypeInput;
  update: UserUpdateWithoutAccountTypeInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithWhereUniqueWithoutRoleInput = {
  create: UserCreateWithoutRoleInput;
  update: UserUpdateWithoutRoleInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithoutAthleteProfileInput = {
  create: UserCreateWithoutAthleteProfileInput;
  update: UserUpdateWithoutAthleteProfileInput;
};

export type UserUpsertWithoutBlockedByUsersInput = {
  create: UserCreateWithoutBlockedByUsersInput;
  update: UserUpdateWithoutBlockedByUsersInput;
};

export type UserUpsertWithoutBlockedUsersInput = {
  create: UserCreateWithoutBlockedUsersInput;
  update: UserUpdateWithoutBlockedUsersInput;
};

export type UserUpsertWithoutCoachProfileInput = {
  create: UserCreateWithoutCoachProfileInput;
  update: UserUpdateWithoutCoachProfileInput;
};

export type UserUpsertWithoutCommentLikesInput = {
  create: UserCreateWithoutCommentLikesInput;
  update: UserUpdateWithoutCommentLikesInput;
};

export type UserUpsertWithoutCommentsInput = {
  create: UserCreateWithoutCommentsInput;
  update: UserUpdateWithoutCommentsInput;
};

export type UserUpsertWithoutEvaluationsCreatedInput = {
  create: UserCreateWithoutEvaluationsCreatedInput;
  update: UserUpdateWithoutEvaluationsCreatedInput;
};

export type UserUpsertWithoutFollowedByInput = {
  create: UserCreateWithoutFollowedByInput;
  update: UserUpdateWithoutFollowedByInput;
};

export type UserUpsertWithoutFollowingInput = {
  create: UserCreateWithoutFollowingInput;
  update: UserUpdateWithoutFollowingInput;
};

export type UserUpsertWithoutInterestedSchoolsInput = {
  create: UserCreateWithoutInterestedSchoolsInput;
  update: UserUpdateWithoutInterestedSchoolsInput;
};

export type UserUpsertWithoutPostFlagInput = {
  create: UserCreateWithoutPostFlagInput;
  update: UserUpdateWithoutPostFlagInput;
};

export type UserUpsertWithoutPostLikesInput = {
  create: UserCreateWithoutPostLikesInput;
  update: UserUpdateWithoutPostLikesInput;
};

export type UserUpsertWithoutPostReportsInput = {
  create: UserCreateWithoutPostReportsInput;
  update: UserUpdateWithoutPostReportsInput;
};

export type UserUpsertWithoutPostsInput = {
  create: UserCreateWithoutPostsInput;
  update: UserUpdateWithoutPostsInput;
};

export type UserUpsertWithoutProspectedSchoolsInput = {
  create: UserCreateWithoutProspectedSchoolsInput;
  update: UserUpdateWithoutProspectedSchoolsInput;
};

export type UserUpsertWithoutRecruitedSchoolsInput = {
  create: UserCreateWithoutRecruitedSchoolsInput;
  update: UserUpdateWithoutRecruitedSchoolsInput;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  accountType?: InputMaybe<AccountTypeRelationFilter>;
  accountTypeId?: InputMaybe<BigIntFilter>;
  address?: InputMaybe<StringNullableFilter>;
  athleteProfile?: InputMaybe<AthleteProfileRelationFilter>;
  avatar?: InputMaybe<StringNullableFilter>;
  blockedByUsers?: InputMaybe<BlocksListRelationFilter>;
  blockedUsers?: InputMaybe<BlocksListRelationFilter>;
  city?: InputMaybe<StringNullableFilter>;
  coachProfile?: InputMaybe<CoachProfileRelationFilter>;
  commentLikes?: InputMaybe<CommentLikeListRelationFilter>;
  comments?: InputMaybe<CommentListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dob?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  evaluationsCreated?: InputMaybe<EvaluationListRelationFilter>;
  fcmToken?: InputMaybe<StringNullableFilter>;
  firebaseUid?: InputMaybe<StringFilter>;
  firstname?: InputMaybe<StringFilter>;
  followedBy?: InputMaybe<FollowsListRelationFilter>;
  following?: InputMaybe<FollowsListRelationFilter>;
  id?: InputMaybe<BigIntFilter>;
  interestedSchools?: InputMaybe<InterestedSchoolsListRelationFilter>;
  isActive?: InputMaybe<BoolFilter>;
  latitude?: InputMaybe<FloatNullableFilter>;
  longitude?: InputMaybe<FloatNullableFilter>;
  postFlag?: InputMaybe<PostFlagListRelationFilter>;
  postLikes?: InputMaybe<PostLikeListRelationFilter>;
  postReports?: InputMaybe<PostReportListRelationFilter>;
  posts?: InputMaybe<PostListRelationFilter>;
  prospectedSchools?: InputMaybe<ProspectedAthleteListRelationFilter>;
  radius?: InputMaybe<IntNullableFilter>;
  recruitedSchools?: InputMaybe<RecruitedAthleteListRelationFilter>;
  role?: InputMaybe<RoleRelationFilter>;
  roleId?: InputMaybe<BigIntNullableFilter>;
  state?: InputMaybe<StringNullableFilter>;
  surname?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  username?: InputMaybe<StringNullableFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firebaseUid?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export enum Visibility {
  Flagged = 'FLAGGED',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type GetAccountTypesQueryVariables = Exact<{
  where?: InputMaybe<AccountTypeWhereInput>;
  orderBy?: InputMaybe<Array<AccountTypeOrderByWithRelationInput> | AccountTypeOrderByWithRelationInput>;
  cursor?: InputMaybe<AccountTypeWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<AccountTypeScalarFieldEnum> | AccountTypeScalarFieldEnum>;
}>;


export type GetAccountTypesQuery = { __typename?: 'Query', accountTypes: Array<{ __typename?: 'AccountType', id: any, uuid: string, title: string, createdAt: any, role?: { __typename?: 'Role', id: any, title: string } | null }> };

export type GetAthletesQueryVariables = Exact<{
  where?: InputMaybe<AthleteProfileWhereInput>;
  orderBy?: InputMaybe<Array<AthleteProfileOrderByWithRelationInput> | AthleteProfileOrderByWithRelationInput>;
  cursor?: InputMaybe<AthleteProfileWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<AthleteProfileScalarFieldEnum> | AthleteProfileScalarFieldEnum>;
}>;


export type GetAthletesQuery = { __typename?: 'Query', athleteProfiles: Array<{ __typename?: 'AthleteProfile', id: any, uuid: string, createdAt: any, verified: boolean, schoolId: any, userId: any, school: { __typename?: 'School', id: any, name: string, schoolType: { __typename?: 'SchoolType', name: string, id: any } }, user: { __typename?: 'User', id: any, firstname: string, surname: string, email: string, avatar?: string | null, username?: string | null, city?: string | null, state?: string | null }, country?: { __typename?: 'Country', name: string, id: any, flag: string, abbreviation: string } | null, position?: { __typename?: 'Position', name: string, id: any, uuid: string, shortName: string } | null, verifiedBy?: { __typename?: 'CoachProfile', id: any, user: { __typename?: 'User', id: any, firstname: string, surname: string } } | null }> };

export type GetPositionsQueryVariables = Exact<{
  where?: InputMaybe<PositionWhereInput>;
  orderBy?: InputMaybe<Array<PositionOrderByWithRelationInput> | PositionOrderByWithRelationInput>;
  cursor?: InputMaybe<PositionWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<PositionScalarFieldEnum> | PositionScalarFieldEnum>;
}>;


export type GetPositionsQuery = { __typename?: 'Query', positions: Array<{ __typename?: 'Position', name: string, id: any, uuid: string, shortName: string }> };

export type GetPositionCategoriesQueryVariables = Exact<{
  where?: InputMaybe<PositionCategoryWhereInput>;
  orderBy?: InputMaybe<Array<PositionCategoryOrderByWithRelationInput> | PositionCategoryOrderByWithRelationInput>;
  cursor?: InputMaybe<PositionCategoryWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<PositionCategoryScalarFieldEnum> | PositionCategoryScalarFieldEnum>;
}>;


export type GetPositionCategoriesQuery = { __typename?: 'Query', positionCategories: Array<{ __typename?: 'PositionCategory', name: string, id: any, uuid: string }> };

export type GetCountryQueryVariables = Exact<{
  where: CountryWhereUniqueInput;
}>;


export type GetCountryQuery = { __typename?: 'Query', country?: { __typename?: 'Country', id: any, name: string, flag: string, abbreviation: string } | null };

export type UpdateAthleteMutationVariables = Exact<{
  data: AthleteProfileUpdateInput;
  where: AthleteProfileWhereUniqueInput;
}>;


export type UpdateAthleteMutation = { __typename?: 'Mutation', updateOneAthleteProfile?: { __typename?: 'AthleteProfile', id: any, uuid: string, createdAt: any, schoolId: any, userId: any, verified: boolean, school: { __typename?: 'School', id: any, name: string, schoolType: { __typename?: 'SchoolType', name: string, id: any } }, user: { __typename?: 'User', id: any, firstname: string, surname: string, email: string, avatar?: string | null, username?: string | null, city?: string | null, state?: string | null }, country?: { __typename?: 'Country', name: string, id: any, flag: string, abbreviation: string } | null, position?: { __typename?: 'Position', name: string, id: any, uuid: string, shortName: string } | null, verifiedBy?: { __typename?: 'CoachProfile', id: any, user: { __typename?: 'User', id: any, firstname: string, surname: string } } | null } | null };

export type GetCoachesQueryVariables = Exact<{
  where?: InputMaybe<CoachProfileWhereInput>;
  orderBy?: InputMaybe<Array<CoachProfileOrderByWithRelationInput> | CoachProfileOrderByWithRelationInput>;
  cursor?: InputMaybe<CoachProfileWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<CoachProfileScalarFieldEnum> | CoachProfileScalarFieldEnum>;
}>;


export type GetCoachesQuery = { __typename?: 'Query', coachProfiles: Array<{ __typename?: 'CoachProfile', id: any, title?: string | null, schoolId: any, user: { __typename?: 'User', firstname: string, surname: string, id: any, avatar?: string | null } }> };

export type RegisterCoachMutationVariables = Exact<{
  data: UserCreateInput;
}>;


export type RegisterCoachMutation = { __typename?: 'Mutation', registerCoach: { __typename?: 'RegisterCoachReturn', coach: { __typename?: 'User', id: any, firstname: string, surname: string, email: string, coachProfile?: { __typename?: 'CoachProfile', id: any, title?: string | null, school: { __typename?: 'School', id: any, name: string } } | null } } };

export type CreatePostMutationVariables = Exact<{
  data: PostCreateInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createOnePost: { __typename?: 'Post', id: any, caption: string, images: Array<string>, videos: Array<string>, uuid: string, createdAt: any, updatedAt: any } };

export type GetPostsQueryVariables = Exact<{
  where?: InputMaybe<PostWhereInput>;
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput> | PostOrderByWithRelationInput>;
  cursor?: InputMaybe<PostWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<PostScalarFieldEnum> | PostScalarFieldEnum>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: any, uuid: string, caption: string, images: Array<string>, videos: Array<string>, videosAspectRatio: Array<string>, createdAt: any, updatedAt: any, _count?: { __typename?: 'PostCount', postLikes: number, comments: number } | null, user: { __typename?: 'User', firstname: string, avatar?: string | null, id: any, username?: string | null, email: string, followedBy: Array<{ __typename?: 'Follows', followerId: any, followingId: any, follower: { __typename?: 'User', id: any, username?: string | null, firstname: string, surname: string, email: string }, following: { __typename?: 'User', id: any, username?: string | null, firstname: string, surname: string, email: string } }> }, postLikes: Array<{ __typename?: 'PostLike', id: any, user: { __typename?: 'User', id: any, firstname: string } }> }> };

export type GetPostQueryVariables = Exact<{
  where: PostWhereUniqueInput;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: any, uuid: string, caption: string, images: Array<string>, videos: Array<string>, videosAspectRatio: Array<string>, createdAt: any, updatedAt: any, _count?: { __typename?: 'PostCount', postLikes: number, comments: number } | null, user: { __typename?: 'User', firstname: string, avatar?: string | null, id: any, username?: string | null, email: string }, postLikes: Array<{ __typename?: 'PostLike', id: any, user: { __typename?: 'User', id: any, firstname: string } }> } | null };

export type GetPostLikeQueryVariables = Exact<{
  where: PostLikeWhereUniqueInput;
}>;


export type GetPostLikeQuery = { __typename?: 'Query', postLike?: { __typename?: 'PostLike', id: any, user: { __typename?: 'User', id: any, firstname: string } } | null };

export type GetPostLikesQueryVariables = Exact<{
  where?: InputMaybe<PostLikeWhereInput>;
}>;


export type GetPostLikesQuery = { __typename?: 'Query', postLikes: Array<{ __typename?: 'PostLike', id: any, user: { __typename?: 'User', id: any, firstname: string } }> };

export type GetMediaQueryVariables = Exact<{
  where?: InputMaybe<PostWhereInput>;
}>;


export type GetMediaQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', images: Array<string>, videos: Array<string> }> };

export type LikePostMutationVariables = Exact<{
  data: PostLikeCreateInput;
}>;


export type LikePostMutation = { __typename?: 'Mutation', createOnePostLike: { __typename?: 'PostLike', id: any } };

export type DeletePostLikeMutationVariables = Exact<{
  where: PostLikeWhereUniqueInput;
}>;


export type DeletePostLikeMutation = { __typename?: 'Mutation', deleteOnePostLike?: { __typename?: 'PostLike', id: any } | null };

export type ProcessVideoMutationVariables = Exact<{
  data: ProcessVideoInput;
}>;


export type ProcessVideoMutation = { __typename?: 'Mutation', processVideo?: { __typename?: 'Return', jobId: string, aspectRatio: number } | null };

export type FlagPostMutationVariables = Exact<{
  data: PostFlagCreateInput;
}>;


export type FlagPostMutation = { __typename?: 'Mutation', createOnePostFlag: { __typename?: 'PostFlag', id: any } };

export type DeletePostMutationVariables = Exact<{
  where: PostWhereUniqueInput;
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deleteOnePost?: { __typename?: 'Post', id: any, uuid: string } | null };

export type SchoolCommonPartsFragment = { __typename?: 'School', id: any, uuid: string, name: string, email: string, logo?: string | null, description?: string | null, secondaryColor: string, primaryColor: string, city?: string | null, state?: string | null, latitude?: number | null, longitude?: number | null, radius?: number | null, address?: string | null, yearFounded?: string | null, division?: string | null, conference?: string | null, yearlyTuition?: string | null, undergradStudents?: number | null, schoolType: { __typename?: 'SchoolType', id: any, name: string } };

export type SkillCommonPartsFragment = { __typename?: 'Skills', id: any, value: string, verified: boolean, skillType: { __typename?: 'SkillType', id: any, name: string, description?: string | null, secondFieldName?: string | null, unit: string, isPrimaryForRecruitment: boolean, icon?: string | null } };

export type GetSchoolsQueryVariables = Exact<{
  where?: InputMaybe<SchoolWhereInput>;
  orderBy?: InputMaybe<Array<SchoolOrderByWithRelationInput> | SchoolOrderByWithRelationInput>;
  cursor?: InputMaybe<SchoolWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetSchoolsQuery = { __typename?: 'Query', schools: Array<{ __typename?: 'School', id: any, uuid: string, name: string, email: string, logo?: string | null, description?: string | null, secondaryColor: string, primaryColor: string, city?: string | null, state?: string | null, latitude?: number | null, longitude?: number | null, radius?: number | null, address?: string | null, yearFounded?: string | null, division?: string | null, conference?: string | null, yearlyTuition?: string | null, undergradStudents?: number | null, schoolType: { __typename?: 'SchoolType', id: any, name: string } }> };

export type GetSchoolQueryVariables = Exact<{
  where: SchoolWhereUniqueInput;
}>;


export type GetSchoolQuery = { __typename?: 'Query', school?: { __typename?: 'School', id: any, uuid: string, name: string, email: string, logo?: string | null, description?: string | null, secondaryColor: string, primaryColor: string, city?: string | null, state?: string | null, latitude?: number | null, longitude?: number | null, radius?: number | null, address?: string | null, yearFounded?: string | null, division?: string | null, conference?: string | null, yearlyTuition?: string | null, undergradStudents?: number | null, schoolType: { __typename?: 'SchoolType', id: any, name: string } } | null };

export type CreateInterestMutationVariables = Exact<{
  data: InterestedSchoolsCreateInput;
}>;


export type CreateInterestMutation = { __typename?: 'Mutation', createOneInterestedSchools: { __typename?: 'InterestedSchools', athlete: { __typename?: 'AthleteProfile', id: any } } };

export type InterestedSchoolsQueryVariables = Exact<{
  where?: InputMaybe<InterestedSchoolsWhereInput>;
  orderBy?: InputMaybe<Array<InterestedSchoolsOrderByWithRelationInput> | InterestedSchoolsOrderByWithRelationInput>;
  cursor?: InputMaybe<InterestedSchoolsWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<InterestedSchoolsScalarFieldEnum> | InterestedSchoolsScalarFieldEnum>;
}>;


export type InterestedSchoolsQuery = { __typename?: 'Query', findManyInterestedSchools: Array<{ __typename?: 'InterestedSchools', userId?: any | null, schoolId: any, AthleteCommitment: number, athleteId: any, school: { __typename?: 'School', id: any, name: string, logo?: string | null }, athlete: { __typename?: 'AthleteProfile', id: any, position?: { __typename?: 'Position', id: any, name: string } | null, skills: Array<{ __typename?: 'Skills', id: any, value: string, verified: boolean, skillType: { __typename?: 'SkillType', id: any, name: string, description?: string | null, secondFieldName?: string | null, unit: string, isPrimaryForRecruitment: boolean, icon?: string | null } }> }, User?: { __typename?: 'User', id: any, firstname: string, surname: string, uuid: string, username?: string | null, avatar?: string | null } | null }> };

export type UpdateInterestMutationVariables = Exact<{
  data: InterestedSchoolsUpdateInput;
  where: InterestedSchoolsWhereUniqueInput;
}>;


export type UpdateInterestMutation = { __typename?: 'Mutation', updateOneInterestedSchools?: { __typename?: 'InterestedSchools', schoolId: any, userId?: any | null } | null };

export type UpdateInterestsMutationVariables = Exact<{
  data: InterestedSchoolsUpdateManyMutationInput;
  where?: InputMaybe<InterestedSchoolsWhereInput>;
}>;


export type UpdateInterestsMutation = { __typename?: 'Mutation', updateManyInterestedSchools: { __typename?: 'AffectedRowsOutput', count: number } };

export type UpdateSchoolMutationVariables = Exact<{
  data: SchoolUpdateInput;
  where: SchoolWhereUniqueInput;
}>;


export type UpdateSchoolMutation = { __typename?: 'Mutation', updateOneSchool?: { __typename?: 'School', id: any, uuid: string, name: string, email: string, logo?: string | null, description?: string | null, secondaryColor: string, primaryColor: string, city?: string | null, state?: string | null, latitude?: number | null, longitude?: number | null, radius?: number | null, address?: string | null, yearFounded?: string | null, division?: string | null, conference?: string | null, yearlyTuition?: string | null, undergradStudents?: number | null, schoolType: { __typename?: 'SchoolType', id: any, name: string } } | null };

export type RecruitedAthletesQueryVariables = Exact<{
  where?: InputMaybe<RecruitedAthleteWhereInput>;
  orderBy?: InputMaybe<Array<RecruitedAthleteOrderByWithRelationInput> | RecruitedAthleteOrderByWithRelationInput>;
  cursor?: InputMaybe<RecruitedAthleteWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<RecruitedAthleteScalarFieldEnum> | RecruitedAthleteScalarFieldEnum>;
}>;


export type RecruitedAthletesQuery = { __typename?: 'Query', recruitedAthletes: Array<{ __typename?: 'RecruitedAthlete', athlete: { __typename?: 'AthleteProfile', id: any, graduationYear?: string | null, position?: { __typename?: 'Position', name: string, category?: { __typename?: 'PositionCategory', name: string } | null } | null, skills: Array<{ __typename?: 'Skills', id: any, value: string, verified: boolean, skillType: { __typename?: 'SkillType', id: any, name: string, description?: string | null, secondFieldName?: string | null, unit: string, isPrimaryForRecruitment: boolean, icon?: string | null } }> }, User?: { __typename?: 'User', id: any, firstname: string, surname: string, avatar?: string | null } | null, school: { __typename?: 'School', id: any, name: string, logo?: string | null } }> };

export type ProspectAthletesQueryVariables = Exact<{
  where?: InputMaybe<ProspectedAthleteWhereInput>;
  orderBy?: InputMaybe<Array<ProspectedAthleteOrderByWithRelationInput> | ProspectedAthleteOrderByWithRelationInput>;
  cursor?: InputMaybe<ProspectedAthleteWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<ProspectedAthleteScalarFieldEnum> | ProspectedAthleteScalarFieldEnum>;
}>;


export type ProspectAthletesQuery = { __typename?: 'Query', prospectedAthletes: Array<{ __typename?: 'ProspectedAthlete', athlete: { __typename?: 'AthleteProfile', id: any, graduationYear?: string | null, position?: { __typename?: 'Position', name: string, category?: { __typename?: 'PositionCategory', name: string } | null } | null, skills: Array<{ __typename?: 'Skills', id: any, value: string, verified: boolean, skillType: { __typename?: 'SkillType', id: any, name: string, description?: string | null, secondFieldName?: string | null, unit: string, isPrimaryForRecruitment: boolean, icon?: string | null } }> }, User?: { __typename?: 'User', id: any, firstname: string, surname: string, avatar?: string | null } | null, school: { __typename?: 'School', id: any, name: string, logo?: string | null } }> };

export type CreateRecruitMutationVariables = Exact<{
  data: RecruitedAthleteCreateInput;
}>;


export type CreateRecruitMutation = { __typename?: 'Mutation', createOneRecruitedAthlete: { __typename?: 'RecruitedAthlete', athleteId: any, schoolId: any, userId?: any | null } };

export type CreateProspectMutationVariables = Exact<{
  data: ProspectedAthleteCreateInput;
}>;


export type CreateProspectMutation = { __typename?: 'Mutation', createOneProspectedAthlete: { __typename?: 'ProspectedAthlete', athleteId: any, schoolId: any, userId?: any | null } };

export type DeleteProspectMutationVariables = Exact<{
  where: ProspectedAthleteWhereUniqueInput;
}>;


export type DeleteProspectMutation = { __typename?: 'Mutation', deleteOneProspectedAthlete?: { __typename?: 'ProspectedAthlete', athleteId: any, schoolId: any } | null };

export type DeleteInterestMutationVariables = Exact<{
  where: InterestedSchoolsWhereUniqueInput;
}>;


export type DeleteInterestMutation = { __typename?: 'Mutation', deleteOneInterestedSchools?: { __typename?: 'InterestedSchools', athleteId: any, schoolId: any } | null };

export type DeleteRecruitMutationVariables = Exact<{
  where: RecruitedAthleteWhereUniqueInput;
}>;


export type DeleteRecruitMutation = { __typename?: 'Mutation', deleteOneRecruitedAthlete?: { __typename?: 'RecruitedAthlete', athleteId: any, schoolId: any } | null };

export type EvaluationsQueryVariables = Exact<{
  where?: InputMaybe<EvaluationWhereInput>;
  orderBy?: InputMaybe<Array<EvaluationOrderByWithRelationInput> | EvaluationOrderByWithRelationInput>;
  cursor?: InputMaybe<EvaluationWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<EvaluationScalarFieldEnum> | EvaluationScalarFieldEnum>;
}>;


export type EvaluationsQuery = { __typename?: 'Query', evaluations: Array<{ __typename?: 'Evaluation', evaluationType: EvaluationType, createdAt: any, note: string, images: Array<string>, videos: Array<string>, athleteId: any, schoolId: any, athlete: { __typename?: 'AthleteProfile', user: { __typename?: 'User', id: any, firstname: string, surname: string, avatar?: string | null } }, createdBy: { __typename?: 'User', id: any, firstname: string, surname: string, avatar?: string | null, coachProfile?: { __typename?: 'CoachProfile', title?: string | null } | null } }> };

export type CreateEvaluationMutationVariables = Exact<{
  data: EvaluationCreateInput;
}>;


export type CreateEvaluationMutation = { __typename?: 'Mutation', createOneEvaluation: { __typename?: 'Evaluation', evaluationType: EvaluationType, note: string, images: Array<string>, videos: Array<string>, athleteId: any, schoolId: any } };

export type GetSkillTypesQueryVariables = Exact<{
  where?: InputMaybe<SkillTypeWhereInput>;
  orderBy?: InputMaybe<Array<SkillTypeOrderByWithRelationInput> | SkillTypeOrderByWithRelationInput>;
  cursor?: InputMaybe<SkillTypeWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<SkillTypeScalarFieldEnum> | SkillTypeScalarFieldEnum>;
}>;


export type GetSkillTypesQuery = { __typename?: 'Query', skillTypes: Array<{ __typename?: 'SkillType', name: string, id: any, uuid: string, mask: Array<string>, unit: string, options: Array<string>, numberOfVideos: number, secondFieldName?: string | null, description?: string | null, secondValueOptions: Array<string>, videosLabels: Array<string> }> };

export type GetSkillsQueryVariables = Exact<{
  where?: InputMaybe<SkillsWhereInput>;
  orderBy?: InputMaybe<Array<SkillsOrderByWithRelationInput> | SkillsOrderByWithRelationInput>;
  cursor?: InputMaybe<SkillsWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<SkillsScalarFieldEnum> | SkillsScalarFieldEnum>;
}>;


export type GetSkillsQuery = { __typename?: 'Query', findManySkills: Array<{ __typename?: 'Skills', id: any, videos: Array<string>, secondValue?: string | null, value: string, skillType: { __typename?: 'SkillType', id: any, name: string, options: Array<string>, numberOfVideos: number, secondFieldName?: string | null, secondValueOptions: Array<string>, videosLabels: Array<string> }, athlete?: { __typename?: 'AthleteProfile', id: any } | null }> };

export type SkillsTypesQueryVariables = Exact<{
  where?: InputMaybe<SkillsWhereInput>;
  orderBy?: InputMaybe<Array<SkillTypeOrderByWithRelationInput> | SkillTypeOrderByWithRelationInput>;
}>;


export type SkillsTypesQuery = { __typename?: 'Query', skillTypes: Array<{ __typename?: 'SkillType', id: any, name: string, options: Array<string>, numberOfVideos: number, secondFieldName?: string | null, secondValueOptions: Array<string>, videosLabels: Array<string>, description?: string | null, unit: string, skills: Array<{ __typename?: 'Skills', id: any, videos: Array<string>, secondValue?: string | null, value: string }> }> };

export type CreateSkillMutationVariables = Exact<{
  data: SkillsCreateInput;
}>;


export type CreateSkillMutation = { __typename?: 'Mutation', createOneSkills: { __typename?: 'Skills', id: any, videos: Array<string>, secondValue?: string | null, value: string, skillType: { __typename?: 'SkillType', id: any, name: string, options: Array<string>, numberOfVideos: number, secondFieldName?: string | null, secondValueOptions: Array<string>, videosLabels: Array<string> } } };

export type UpsertOneSkillMutationVariables = Exact<{
  where: SkillsWhereUniqueInput;
  create: SkillsCreateInput;
  update: SkillsUpdateInput;
}>;


export type UpsertOneSkillMutation = { __typename?: 'Mutation', upsertOneSkills: { __typename?: 'Skills', id: any, videos: Array<string> } };

export type UpdateOneSkillMutationVariables = Exact<{
  data: SkillsUpdateInput;
  where: SkillsWhereUniqueInput;
}>;


export type UpdateOneSkillMutation = { __typename?: 'Mutation', updateOneSkills?: { __typename?: 'Skills', id: any, videos: Array<string> } | null };

export type UserCommonPartsFragment = { __typename?: 'User', id: any, firstname: string, surname: string, email: string, isActive: boolean, avatar?: string | null, dob?: any | null, username?: string | null, address?: string | null, firebaseUid: string, city?: string | null, state?: string | null, createdAt: any, _count?: { __typename?: 'UserCount', following: number, followedBy: number } | null, following: Array<{ __typename?: 'Follows', followingId: any, following: { __typename?: 'User', id: any, firstname: string, surname: string, username?: string | null } }>, athleteProfile?: { __typename?: 'AthleteProfile', id: any, uuid: string, graduationYear?: string | null, hudlLink?: string | null, recruitingContactName?: string | null, recruitingPhoneNumber?: string | null, recruitingRelationship?: string | null, coachContactName?: string | null, coachContactPhoneNumber?: string | null, coachContactTitle?: string | null, createdAt: any, playerCardUrl?: string | null, verified: boolean, gpa?: string | null, schoolId: any, userId: any, school: { __typename?: 'School', id: any, name: string, logo?: string | null, schoolType: { __typename?: 'SchoolType', name: string, id: any } }, transcripts: Array<{ __typename?: 'Transcripts', name: string, url: string, id: any, uuid: string }>, position?: { __typename?: 'Position', name: string, shortName: string, id: any } | null, skills: Array<{ __typename?: 'Skills', id: any, videos: Array<string>, value: string, skillType: { __typename?: 'SkillType', name: string, id: any, unit: string, options: Array<string>, numberOfVideos: number, secondFieldName?: string | null, description?: string | null, secondValueOptions: Array<string> } }>, country?: { __typename?: 'Country', name: string, id: any, flag: string, abbreviation: string } | null } | null, coachProfile?: { __typename?: 'CoachProfile', id: any, userId: any, title?: string | null, city?: string | null, state?: string | null, schoolId: any, country?: { __typename?: 'Country', name: string, id: any, flag: string, abbreviation: string } | null, school: { __typename?: 'School', id: any, name: string, email: string, logo?: string | null, description?: string | null, secondaryColor: string, primaryColor: string, city?: string | null, latitude?: number | null, longitude?: number | null, radius?: number | null, address?: string | null, yearFounded?: string | null, division?: string | null, conference?: string | null, yearlyTuition?: string | null, undergradStudents?: number | null, schoolType: { __typename?: 'SchoolType', name: string, id: any } } } | null, accountType: { __typename?: 'AccountType', id: any, title: string, createdAt: any, role?: { __typename?: 'Role', id: any, title: string } | null } };

export type GetFollowersQueryVariables = Exact<{
  where?: InputMaybe<FollowsWhereInput>;
  orderBy?: InputMaybe<Array<FollowsOrderByWithRelationInput> | FollowsOrderByWithRelationInput>;
  cursor?: InputMaybe<FollowsWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<FollowsScalarFieldEnum> | FollowsScalarFieldEnum>;
}>;


export type GetFollowersQuery = { __typename?: 'Query', findManyFollows: Array<{ __typename?: 'Follows', follower: { __typename?: 'User', id: any, firstname: string, surname: string, email: string, avatar?: string | null, dob?: any | null, username?: string | null, address?: string | null, _count?: { __typename?: 'UserCount', following: number, followedBy: number } | null, athleteProfile?: { __typename?: 'AthleteProfile', id: any, uuid: string, gpa?: string | null, createdAt: any, hudlLink?: string | null, recruitingContactName?: string | null, recruitingPhoneNumber?: string | null, recruitingRelationship?: string | null, playerCardUrl?: string | null, verified: boolean, schoolId: any, userId: any, school: { __typename?: 'School', id: any, name: string, schoolType: { __typename?: 'SchoolType', name: string, id: any } }, transcripts: Array<{ __typename?: 'Transcripts', name: string, url: string, id: any, uuid: string }>, position?: { __typename?: 'Position', name: string, shortName: string, id: any } | null, skills: Array<{ __typename?: 'Skills', id: any, videos: Array<string>, value: string, skillType: { __typename?: 'SkillType', name: string, id: any, unit: string, options: Array<string>, numberOfVideos: number, secondFieldName?: string | null, description?: string | null, secondValueOptions: Array<string> } }>, country?: { __typename?: 'Country', name: string, id: any, flag: string, abbreviation: string } | null } | null, accountType: { __typename?: 'AccountType', id: any, title: string, createdAt: any, role?: { __typename?: 'Role', id: any, title: string } | null } }, following: { __typename?: 'User', id: any, firstname: string, surname: string, email: string, avatar?: string | null, dob?: any | null, username?: string | null, address?: string | null, _count?: { __typename?: 'UserCount', following: number, followedBy: number } | null, athleteProfile?: { __typename?: 'AthleteProfile', id: any, uuid: string, gpa?: string | null, createdAt: any, hudlLink?: string | null, recruitingContactName?: string | null, recruitingPhoneNumber?: string | null, recruitingRelationship?: string | null, playerCardUrl?: string | null, schoolId: any, userId: any, school: { __typename?: 'School', id: any, name: string, schoolType: { __typename?: 'SchoolType', name: string, id: any } }, transcripts: Array<{ __typename?: 'Transcripts', name: string, url: string, id: any, uuid: string }>, position?: { __typename?: 'Position', name: string, shortName: string, id: any } | null, skills: Array<{ __typename?: 'Skills', id: any, videos: Array<string>, value: string, skillType: { __typename?: 'SkillType', name: string, id: any, unit: string, options: Array<string>, numberOfVideos: number, secondFieldName?: string | null, description?: string | null, secondValueOptions: Array<string> } }>, country?: { __typename?: 'Country', name: string, id: any, flag: string, abbreviation: string } | null } | null, accountType: { __typename?: 'AccountType', id: any, title: string, createdAt: any, role?: { __typename?: 'Role', id: any, title: string } | null } } }> };

export type GetUserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: any, firstname: string, surname: string, email: string, isActive: boolean, avatar?: string | null, dob?: any | null, username?: string | null, address?: string | null, firebaseUid: string, city?: string | null, state?: string | null, createdAt: any, followedBy: Array<{ __typename?: 'Follows', followerId: any, follower: { __typename?: 'User', id: any, firstname: string, surname: string } }>, _count?: { __typename?: 'UserCount', following: number, followedBy: number } | null, following: Array<{ __typename?: 'Follows', followingId: any, following: { __typename?: 'User', id: any, firstname: string, surname: string, username?: string | null } }>, athleteProfile?: { __typename?: 'AthleteProfile', id: any, uuid: string, graduationYear?: string | null, hudlLink?: string | null, recruitingContactName?: string | null, recruitingPhoneNumber?: string | null, recruitingRelationship?: string | null, coachContactName?: string | null, coachContactPhoneNumber?: string | null, coachContactTitle?: string | null, createdAt: any, playerCardUrl?: string | null, verified: boolean, gpa?: string | null, schoolId: any, userId: any, school: { __typename?: 'School', id: any, name: string, logo?: string | null, schoolType: { __typename?: 'SchoolType', name: string, id: any } }, transcripts: Array<{ __typename?: 'Transcripts', name: string, url: string, id: any, uuid: string }>, position?: { __typename?: 'Position', name: string, shortName: string, id: any } | null, skills: Array<{ __typename?: 'Skills', id: any, videos: Array<string>, value: string, skillType: { __typename?: 'SkillType', name: string, id: any, unit: string, options: Array<string>, numberOfVideos: number, secondFieldName?: string | null, description?: string | null, secondValueOptions: Array<string> } }>, country?: { __typename?: 'Country', name: string, id: any, flag: string, abbreviation: string } | null } | null, coachProfile?: { __typename?: 'CoachProfile', id: any, userId: any, title?: string | null, city?: string | null, state?: string | null, schoolId: any, country?: { __typename?: 'Country', name: string, id: any, flag: string, abbreviation: string } | null, school: { __typename?: 'School', id: any, name: string, email: string, logo?: string | null, description?: string | null, secondaryColor: string, primaryColor: string, city?: string | null, latitude?: number | null, longitude?: number | null, radius?: number | null, address?: string | null, yearFounded?: string | null, division?: string | null, conference?: string | null, yearlyTuition?: string | null, undergradStudents?: number | null, schoolType: { __typename?: 'SchoolType', name: string, id: any } } } | null, accountType: { __typename?: 'AccountType', id: any, title: string, createdAt: any, role?: { __typename?: 'Role', id: any, title: string } | null } } | null };

export type GetUsersQueryVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput> | UserOrderByWithRelationInput>;
  cursor?: InputMaybe<UserWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum> | UserScalarFieldEnum>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: any, firstname: string, surname: string, email: string, avatar?: string | null, username?: string | null, city?: string | null, state?: string | null, isActive: boolean, dob?: any | null, address?: string | null, firebaseUid: string, createdAt: any, athleteProfile?: { __typename?: 'AthleteProfile', id: any, uuid: string, graduationYear?: string | null, hudlLink?: string | null, recruitingContactName?: string | null, recruitingPhoneNumber?: string | null, recruitingRelationship?: string | null, coachContactName?: string | null, coachContactPhoneNumber?: string | null, coachContactTitle?: string | null, createdAt: any, playerCardUrl?: string | null, verified: boolean, gpa?: string | null, schoolId: any, userId: any, country?: { __typename?: 'Country', name: string, id: any, flag: string, abbreviation: string } | null, school: { __typename?: 'School', id: any, name: string, logo?: string | null, schoolType: { __typename?: 'SchoolType', name: string, id: any } }, transcripts: Array<{ __typename?: 'Transcripts', name: string, url: string, id: any, uuid: string }>, position?: { __typename?: 'Position', name: string, shortName: string, id: any } | null, skills: Array<{ __typename?: 'Skills', id: any, videos: Array<string>, value: string, skillType: { __typename?: 'SkillType', name: string, id: any, unit: string, options: Array<string>, numberOfVideos: number, secondFieldName?: string | null, description?: string | null, secondValueOptions: Array<string> } }> } | null, _count?: { __typename?: 'UserCount', following: number, followedBy: number } | null, following: Array<{ __typename?: 'Follows', followingId: any, following: { __typename?: 'User', id: any, firstname: string, surname: string, username?: string | null } }>, coachProfile?: { __typename?: 'CoachProfile', id: any, userId: any, title?: string | null, city?: string | null, state?: string | null, schoolId: any, country?: { __typename?: 'Country', name: string, id: any, flag: string, abbreviation: string } | null, school: { __typename?: 'School', id: any, name: string, email: string, logo?: string | null, description?: string | null, secondaryColor: string, primaryColor: string, city?: string | null, latitude?: number | null, longitude?: number | null, radius?: number | null, address?: string | null, yearFounded?: string | null, division?: string | null, conference?: string | null, yearlyTuition?: string | null, undergradStudents?: number | null, schoolType: { __typename?: 'SchoolType', name: string, id: any } } } | null, accountType: { __typename?: 'AccountType', id: any, title: string, createdAt: any, role?: { __typename?: 'Role', id: any, title: string } | null } }> };

export type GetBlockedUsersQueryVariables = Exact<{
  where?: InputMaybe<BlocksWhereInput>;
  orderBy?: InputMaybe<Array<BlocksOrderByWithRelationInput> | BlocksOrderByWithRelationInput>;
  cursor?: InputMaybe<BlocksWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<BlocksScalarFieldEnum> | BlocksScalarFieldEnum>;
}>;


export type GetBlockedUsersQuery = { __typename?: 'Query', findManyBlocks: Array<{ __typename?: 'Blocks', blocked: { __typename?: 'User', id: any, firstname: string, username?: string | null, surname: string, avatar?: string | null, accountType: { __typename?: 'AccountType', id: any, title: string } } }> };

export type CreateOneUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;


export type CreateOneUserMutation = { __typename?: 'Mutation', createOneUser: { __typename?: 'User', id: any, firstname: string, surname: string, email: string, isActive: boolean, avatar?: string | null, dob?: any | null, username?: string | null, address?: string | null, firebaseUid: string, city?: string | null, state?: string | null, createdAt: any, _count?: { __typename?: 'UserCount', following: number, followedBy: number } | null, following: Array<{ __typename?: 'Follows', followingId: any, following: { __typename?: 'User', id: any, firstname: string, surname: string, username?: string | null } }>, athleteProfile?: { __typename?: 'AthleteProfile', id: any, uuid: string, graduationYear?: string | null, hudlLink?: string | null, recruitingContactName?: string | null, recruitingPhoneNumber?: string | null, recruitingRelationship?: string | null, coachContactName?: string | null, coachContactPhoneNumber?: string | null, coachContactTitle?: string | null, createdAt: any, playerCardUrl?: string | null, verified: boolean, gpa?: string | null, schoolId: any, userId: any, school: { __typename?: 'School', id: any, name: string, logo?: string | null, schoolType: { __typename?: 'SchoolType', name: string, id: any } }, transcripts: Array<{ __typename?: 'Transcripts', name: string, url: string, id: any, uuid: string }>, position?: { __typename?: 'Position', name: string, shortName: string, id: any } | null, skills: Array<{ __typename?: 'Skills', id: any, videos: Array<string>, value: string, skillType: { __typename?: 'SkillType', name: string, id: any, unit: string, options: Array<string>, numberOfVideos: number, secondFieldName?: string | null, description?: string | null, secondValueOptions: Array<string> } }>, country?: { __typename?: 'Country', name: string, id: any, flag: string, abbreviation: string } | null } | null, coachProfile?: { __typename?: 'CoachProfile', id: any, userId: any, title?: string | null, city?: string | null, state?: string | null, schoolId: any, country?: { __typename?: 'Country', name: string, id: any, flag: string, abbreviation: string } | null, school: { __typename?: 'School', id: any, name: string, email: string, logo?: string | null, description?: string | null, secondaryColor: string, primaryColor: string, city?: string | null, latitude?: number | null, longitude?: number | null, radius?: number | null, address?: string | null, yearFounded?: string | null, division?: string | null, conference?: string | null, yearlyTuition?: string | null, undergradStudents?: number | null, schoolType: { __typename?: 'SchoolType', name: string, id: any } } } | null, accountType: { __typename?: 'AccountType', id: any, title: string, createdAt: any, role?: { __typename?: 'Role', id: any, title: string } | null } } };

export type UpdateUserMutationVariables = Exact<{
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateOneUser?: { __typename?: 'User', id: any, firstname: string, surname: string, email: string, avatar?: string | null, dob?: any | null, username?: string | null, address?: string | null, city?: string | null, state?: string | null, _count?: { __typename?: 'UserCount', following: number, followedBy: number } | null, athleteProfile?: { __typename?: 'AthleteProfile', id: any, uuid: string, gpa?: string | null, createdAt: any, hudlLink?: string | null, recruitingContactName?: string | null, recruitingPhoneNumber?: string | null, recruitingRelationship?: string | null, playerCardUrl?: string | null, verified: boolean, graduationYear?: string | null, schoolId: any, userId: any, school: { __typename?: 'School', id: any, name: string, email: string, logo?: string | null, description?: string | null, secondaryColor: string, primaryColor: string, city?: string | null, latitude?: number | null, longitude?: number | null, radius?: number | null, address?: string | null, yearFounded?: string | null, division?: string | null, conference?: string | null, yearlyTuition?: string | null, undergradStudents?: number | null, schoolType: { __typename?: 'SchoolType', name: string, id: any } }, transcripts: Array<{ __typename?: 'Transcripts', name: string, url: string, id: any, uuid: string }>, position?: { __typename?: 'Position', name: string, shortName: string, id: any } | null, skills: Array<{ __typename?: 'Skills', id: any, videos: Array<string>, value: string, skillType: { __typename?: 'SkillType', name: string, id: any, unit: string, options: Array<string>, numberOfVideos: number, secondFieldName?: string | null, description?: string | null, secondValueOptions: Array<string> } }>, country?: { __typename?: 'Country', name: string, id: any, flag: string, abbreviation: string } | null } | null, accountType: { __typename?: 'AccountType', id: any, title: string, createdAt: any, role?: { __typename?: 'Role', id: any, title: string } | null } } | null };

export type FollowUserMutationVariables = Exact<{
  data: FollowsCreateInput;
}>;


export type FollowUserMutation = { __typename?: 'Mutation', createOneFollows: { __typename?: 'Follows', followerId: any, followingId: any } };

export type BlockUserMutationVariables = Exact<{
  data: BlocksCreateInput;
}>;


export type BlockUserMutation = { __typename?: 'Mutation', createOneBlocks: { __typename?: 'Blocks', blockedId: any, blockedById: any } };

export type UnBlockUserMutationVariables = Exact<{
  where: BlocksWhereUniqueInput;
}>;


export type UnBlockUserMutation = { __typename?: 'Mutation', deleteOneBlocks?: { __typename?: 'Blocks', blockedId: any, blockedById: any } | null };

export type UnFollowUserMutationVariables = Exact<{
  where: FollowsWhereUniqueInput;
}>;


export type UnFollowUserMutation = { __typename?: 'Mutation', deleteOneFollows?: { __typename?: 'Follows', followerId: any, followingId: any } | null };

export type DeleteUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteOneUser?: { __typename?: 'User', id: any } | null };

export const SchoolCommonPartsFragmentDoc = gql`
    fragment SchoolCommonParts on School {
  id
  uuid
  name
  email
  schoolType {
    id
    name
  }
  logo
  description
  secondaryColor
  primaryColor
  description
  city
  state
  latitude
  longitude
  radius
  address
  yearFounded
  division
  conference
  yearlyTuition
  undergradStudents
}
    `;
export const SkillCommonPartsFragmentDoc = gql`
    fragment SkillCommonParts on Skills {
  id
  value
  verified
  skillType {
    id
    name
    description
    secondFieldName
    unit
    isPrimaryForRecruitment
    icon
  }
}
    `;
export const UserCommonPartsFragmentDoc = gql`
    fragment UserCommonParts on User {
  id
  firstname
  surname
  email
  isActive
  avatar
  dob
  username
  address
  firebaseUid
  city
  state
  createdAt
  _count {
    following
    followedBy
  }
  following {
    followingId
    following {
      id
      firstname
      surname
      username
    }
  }
  athleteProfile {
    id
    uuid
    graduationYear
    hudlLink
    recruitingContactName
    recruitingPhoneNumber
    recruitingRelationship
    coachContactName
    coachContactPhoneNumber
    coachContactTitle
    createdAt
    playerCardUrl
    verified
    gpa
    school {
      id
      name
      logo
      schoolType {
        name
        id
      }
    }
    schoolId
    transcripts {
      name
      url
      id
      uuid
    }
    position {
      name
      shortName
      id
    }
    skills {
      id
      videos
      value
      skillType {
        name
        id
        unit
        options
        numberOfVideos
        secondFieldName
        description
        secondValueOptions
      }
    }
    userId
    country {
      name
      id
      flag
      abbreviation
    }
  }
  coachProfile {
    id
    userId
    title
    city
    state
    country {
      name
      id
      flag
      abbreviation
    }
    school {
      id
      name
      email
      logo
      description
      secondaryColor
      primaryColor
      description
      city
      latitude
      longitude
      radius
      address
      yearFounded
      division
      conference
      yearlyTuition
      undergradStudents
      schoolType {
        name
        id
      }
    }
    schoolId
  }
  accountType {
    id
    title
    createdAt
    role {
      id
      title
    }
  }
}
    `;
export const GetAccountTypesDocument = gql`
    query getAccountTypes($where: AccountTypeWhereInput, $orderBy: [AccountTypeOrderByWithRelationInput!], $cursor: AccountTypeWhereUniqueInput, $take: Int, $skip: Int, $distinct: [AccountTypeScalarFieldEnum!]) {
  accountTypes(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    take: $take
    skip: $skip
    distinct: $distinct
  ) {
    id
    uuid
    title
    createdAt
    role {
      id
      title
    }
  }
}
    `;

/**
 * __useGetAccountTypesQuery__
 *
 * To run a query within a React component, call `useGetAccountTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountTypesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useGetAccountTypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAccountTypesQuery, GetAccountTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAccountTypesQuery, GetAccountTypesQueryVariables>(GetAccountTypesDocument, options);
      }
export function useGetAccountTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAccountTypesQuery, GetAccountTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAccountTypesQuery, GetAccountTypesQueryVariables>(GetAccountTypesDocument, options);
        }
export function useGetAccountTypesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetAccountTypesQuery, GetAccountTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAccountTypesQuery, GetAccountTypesQueryVariables>(GetAccountTypesDocument, options);
        }
export type GetAccountTypesQueryHookResult = ReturnType<typeof useGetAccountTypesQuery>;
export type GetAccountTypesLazyQueryHookResult = ReturnType<typeof useGetAccountTypesLazyQuery>;
export type GetAccountTypesSuspenseQueryHookResult = ReturnType<typeof useGetAccountTypesSuspenseQuery>;
export type GetAccountTypesQueryResult = Apollo.QueryResult<GetAccountTypesQuery, GetAccountTypesQueryVariables>;
export const GetAthletesDocument = gql`
    query getAthletes($where: AthleteProfileWhereInput, $orderBy: [AthleteProfileOrderByWithRelationInput!], $cursor: AthleteProfileWhereUniqueInput, $take: Int, $skip: Int, $distinct: [AthleteProfileScalarFieldEnum!]) {
  athleteProfiles(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    skip: $skip
    take: $take
    distinct: $distinct
  ) {
    id
    uuid
    createdAt
    verified
    school {
      id
      name
      schoolType {
        name
        id
      }
    }
    schoolId
    userId
    user {
      id
      firstname
      surname
      email
      avatar
      username
      city
      state
    }
    country {
      name
      id
      flag
      abbreviation
    }
    position {
      name
      id
      uuid
      shortName
    }
    verifiedBy {
      id
      user {
        id
        firstname
        surname
      }
    }
  }
}
    `;

/**
 * __useGetAthletesQuery__
 *
 * To run a query within a React component, call `useGetAthletesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAthletesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAthletesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useGetAthletesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAthletesQuery, GetAthletesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAthletesQuery, GetAthletesQueryVariables>(GetAthletesDocument, options);
      }
export function useGetAthletesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAthletesQuery, GetAthletesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAthletesQuery, GetAthletesQueryVariables>(GetAthletesDocument, options);
        }
export function useGetAthletesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetAthletesQuery, GetAthletesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAthletesQuery, GetAthletesQueryVariables>(GetAthletesDocument, options);
        }
export type GetAthletesQueryHookResult = ReturnType<typeof useGetAthletesQuery>;
export type GetAthletesLazyQueryHookResult = ReturnType<typeof useGetAthletesLazyQuery>;
export type GetAthletesSuspenseQueryHookResult = ReturnType<typeof useGetAthletesSuspenseQuery>;
export type GetAthletesQueryResult = Apollo.QueryResult<GetAthletesQuery, GetAthletesQueryVariables>;
export const GetPositionsDocument = gql`
    query getPositions($where: PositionWhereInput, $orderBy: [PositionOrderByWithRelationInput!], $cursor: PositionWhereUniqueInput, $take: Int, $skip: Int, $distinct: [PositionScalarFieldEnum!]) {
  positions(
    where: $where
    orderBy: $orderBy
    take: $take
    skip: $skip
    distinct: $distinct
    cursor: $cursor
  ) {
    name
    id
    uuid
    shortName
  }
}
    `;

/**
 * __useGetPositionsQuery__
 *
 * To run a query within a React component, call `useGetPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPositionsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useGetPositionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPositionsQuery, GetPositionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, options);
      }
export function useGetPositionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPositionsQuery, GetPositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, options);
        }
export function useGetPositionsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetPositionsQuery, GetPositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, options);
        }
export type GetPositionsQueryHookResult = ReturnType<typeof useGetPositionsQuery>;
export type GetPositionsLazyQueryHookResult = ReturnType<typeof useGetPositionsLazyQuery>;
export type GetPositionsSuspenseQueryHookResult = ReturnType<typeof useGetPositionsSuspenseQuery>;
export type GetPositionsQueryResult = Apollo.QueryResult<GetPositionsQuery, GetPositionsQueryVariables>;
export const GetPositionCategoriesDocument = gql`
    query getPositionCategories($where: PositionCategoryWhereInput, $orderBy: [PositionCategoryOrderByWithRelationInput!], $cursor: PositionCategoryWhereUniqueInput, $take: Int, $skip: Int, $distinct: [PositionCategoryScalarFieldEnum!]) {
  positionCategories(
    where: $where
    orderBy: $orderBy
    take: $take
    skip: $skip
    distinct: $distinct
    cursor: $cursor
  ) {
    name
    id
    uuid
  }
}
    `;

/**
 * __useGetPositionCategoriesQuery__
 *
 * To run a query within a React component, call `useGetPositionCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPositionCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPositionCategoriesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useGetPositionCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPositionCategoriesQuery, GetPositionCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPositionCategoriesQuery, GetPositionCategoriesQueryVariables>(GetPositionCategoriesDocument, options);
      }
export function useGetPositionCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPositionCategoriesQuery, GetPositionCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPositionCategoriesQuery, GetPositionCategoriesQueryVariables>(GetPositionCategoriesDocument, options);
        }
export function useGetPositionCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetPositionCategoriesQuery, GetPositionCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPositionCategoriesQuery, GetPositionCategoriesQueryVariables>(GetPositionCategoriesDocument, options);
        }
export type GetPositionCategoriesQueryHookResult = ReturnType<typeof useGetPositionCategoriesQuery>;
export type GetPositionCategoriesLazyQueryHookResult = ReturnType<typeof useGetPositionCategoriesLazyQuery>;
export type GetPositionCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetPositionCategoriesSuspenseQuery>;
export type GetPositionCategoriesQueryResult = Apollo.QueryResult<GetPositionCategoriesQuery, GetPositionCategoriesQueryVariables>;
export const GetCountryDocument = gql`
    query getCountry($where: CountryWhereUniqueInput!) {
  country(where: $where) {
    id
    name
    flag
    abbreviation
  }
}
    `;

/**
 * __useGetCountryQuery__
 *
 * To run a query within a React component, call `useGetCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountryQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCountryQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCountryQuery, GetCountryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, options);
      }
export function useGetCountryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCountryQuery, GetCountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, options);
        }
export function useGetCountrySuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetCountryQuery, GetCountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, options);
        }
export type GetCountryQueryHookResult = ReturnType<typeof useGetCountryQuery>;
export type GetCountryLazyQueryHookResult = ReturnType<typeof useGetCountryLazyQuery>;
export type GetCountrySuspenseQueryHookResult = ReturnType<typeof useGetCountrySuspenseQuery>;
export type GetCountryQueryResult = Apollo.QueryResult<GetCountryQuery, GetCountryQueryVariables>;
export const UpdateAthleteDocument = gql`
    mutation updateAthlete($data: AthleteProfileUpdateInput!, $where: AthleteProfileWhereUniqueInput!) {
  updateOneAthleteProfile(where: $where, data: $data) {
    id
    uuid
    createdAt
    school {
      id
      name
      schoolType {
        name
        id
      }
    }
    schoolId
    userId
    user {
      id
      firstname
      surname
      email
      avatar
      username
      city
      state
    }
    country {
      name
      id
      flag
      abbreviation
    }
    position {
      name
      id
      uuid
      shortName
    }
    verified
    verifiedBy {
      id
      user {
        id
        firstname
        surname
      }
    }
  }
}
    `;
export type UpdateAthleteMutationFn = Apollo.MutationFunction<UpdateAthleteMutation, UpdateAthleteMutationVariables>;

/**
 * __useUpdateAthleteMutation__
 *
 * To run a mutation, you first call `useUpdateAthleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAthleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAthleteMutation, { data, loading, error }] = useUpdateAthleteMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateAthleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAthleteMutation, UpdateAthleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateAthleteMutation, UpdateAthleteMutationVariables>(UpdateAthleteDocument, options);
      }
export type UpdateAthleteMutationHookResult = ReturnType<typeof useUpdateAthleteMutation>;
export type UpdateAthleteMutationResult = Apollo.MutationResult<UpdateAthleteMutation>;
export type UpdateAthleteMutationOptions = Apollo.BaseMutationOptions<UpdateAthleteMutation, UpdateAthleteMutationVariables>;
export const GetCoachesDocument = gql`
    query getCoaches($where: CoachProfileWhereInput, $orderBy: [CoachProfileOrderByWithRelationInput!], $cursor: CoachProfileWhereUniqueInput, $take: Int, $skip: Int, $distinct: [CoachProfileScalarFieldEnum!]) {
  coachProfiles(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    skip: $skip
    take: $take
    distinct: $distinct
  ) {
    id
    title
    schoolId
    user {
      firstname
      surname
      id
      avatar
    }
  }
}
    `;

/**
 * __useGetCoachesQuery__
 *
 * To run a query within a React component, call `useGetCoachesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoachesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoachesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useGetCoachesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCoachesQuery, GetCoachesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCoachesQuery, GetCoachesQueryVariables>(GetCoachesDocument, options);
      }
export function useGetCoachesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCoachesQuery, GetCoachesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCoachesQuery, GetCoachesQueryVariables>(GetCoachesDocument, options);
        }
export function useGetCoachesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetCoachesQuery, GetCoachesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCoachesQuery, GetCoachesQueryVariables>(GetCoachesDocument, options);
        }
export type GetCoachesQueryHookResult = ReturnType<typeof useGetCoachesQuery>;
export type GetCoachesLazyQueryHookResult = ReturnType<typeof useGetCoachesLazyQuery>;
export type GetCoachesSuspenseQueryHookResult = ReturnType<typeof useGetCoachesSuspenseQuery>;
export type GetCoachesQueryResult = Apollo.QueryResult<GetCoachesQuery, GetCoachesQueryVariables>;
export const RegisterCoachDocument = gql`
    mutation registerCoach($data: UserCreateInput!) {
  registerCoach(data: $data) {
    coach {
      id
      firstname
      surname
      email
      coachProfile {
        id
        title
        school {
          id
          name
        }
      }
    }
  }
}
    `;
export type RegisterCoachMutationFn = Apollo.MutationFunction<RegisterCoachMutation, RegisterCoachMutationVariables>;

/**
 * __useRegisterCoachMutation__
 *
 * To run a mutation, you first call `useRegisterCoachMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterCoachMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerCoachMutation, { data, loading, error }] = useRegisterCoachMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterCoachMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterCoachMutation, RegisterCoachMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterCoachMutation, RegisterCoachMutationVariables>(RegisterCoachDocument, options);
      }
export type RegisterCoachMutationHookResult = ReturnType<typeof useRegisterCoachMutation>;
export type RegisterCoachMutationResult = Apollo.MutationResult<RegisterCoachMutation>;
export type RegisterCoachMutationOptions = Apollo.BaseMutationOptions<RegisterCoachMutation, RegisterCoachMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($data: PostCreateInput!) {
  createOnePost(data: $data) {
    id
    caption
    images
    videos
    uuid
    createdAt
    updatedAt
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const GetPostsDocument = gql`
    query getPosts($where: PostWhereInput, $orderBy: [PostOrderByWithRelationInput!], $cursor: PostWhereUniqueInput, $take: Int, $skip: Int, $distinct: [PostScalarFieldEnum!], $userId: BigInt) {
  posts(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    take: $take
    skip: $skip
    distinct: $distinct
  ) {
    _count {
      postLikes
      comments
    }
    id
    uuid
    caption
    images
    videos
    videosAspectRatio
    user {
      firstname
      avatar
      id
      username
      email
      followedBy {
        followerId
        followingId
        follower {
          id
          username
          firstname
          surname
          email
        }
        following {
          id
          username
          firstname
          surname
          email
        }
      }
    }
    postLikes(where: {userId: {equals: $userId}}) {
      id
      user {
        id
        firstname
      }
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export function useGetPostsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetPostDocument = gql`
    query getPost($where: PostWhereUniqueInput!, $userId: BigInt) {
  post(where: $where) {
    _count {
      postLikes
      comments
    }
    id
    uuid
    caption
    images
    videos
    videosAspectRatio
    user {
      firstname
      avatar
      id
      username
      email
    }
    postLikes(where: {userId: {equals: $userId}}) {
      id
      user {
        id
        firstname
      }
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      where: // value for 'where'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export function useGetPostSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostSuspenseQueryHookResult = ReturnType<typeof useGetPostSuspenseQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetPostLikeDocument = gql`
    query getPostLike($where: PostLikeWhereUniqueInput!) {
  postLike(where: $where) {
    id
    user {
      id
      firstname
    }
  }
}
    `;

/**
 * __useGetPostLikeQuery__
 *
 * To run a query within a React component, call `useGetPostLikeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostLikeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostLikeQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetPostLikeQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPostLikeQuery, GetPostLikeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPostLikeQuery, GetPostLikeQueryVariables>(GetPostLikeDocument, options);
      }
export function useGetPostLikeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostLikeQuery, GetPostLikeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPostLikeQuery, GetPostLikeQueryVariables>(GetPostLikeDocument, options);
        }
export function useGetPostLikeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetPostLikeQuery, GetPostLikeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPostLikeQuery, GetPostLikeQueryVariables>(GetPostLikeDocument, options);
        }
export type GetPostLikeQueryHookResult = ReturnType<typeof useGetPostLikeQuery>;
export type GetPostLikeLazyQueryHookResult = ReturnType<typeof useGetPostLikeLazyQuery>;
export type GetPostLikeSuspenseQueryHookResult = ReturnType<typeof useGetPostLikeSuspenseQuery>;
export type GetPostLikeQueryResult = Apollo.QueryResult<GetPostLikeQuery, GetPostLikeQueryVariables>;
export const GetPostLikesDocument = gql`
    query getPostLikes($where: PostLikeWhereInput) {
  postLikes(where: $where) {
    id
    user {
      id
      firstname
    }
  }
}
    `;

/**
 * __useGetPostLikesQuery__
 *
 * To run a query within a React component, call `useGetPostLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostLikesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetPostLikesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostLikesQuery, GetPostLikesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPostLikesQuery, GetPostLikesQueryVariables>(GetPostLikesDocument, options);
      }
export function useGetPostLikesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostLikesQuery, GetPostLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPostLikesQuery, GetPostLikesQueryVariables>(GetPostLikesDocument, options);
        }
export function useGetPostLikesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetPostLikesQuery, GetPostLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPostLikesQuery, GetPostLikesQueryVariables>(GetPostLikesDocument, options);
        }
export type GetPostLikesQueryHookResult = ReturnType<typeof useGetPostLikesQuery>;
export type GetPostLikesLazyQueryHookResult = ReturnType<typeof useGetPostLikesLazyQuery>;
export type GetPostLikesSuspenseQueryHookResult = ReturnType<typeof useGetPostLikesSuspenseQuery>;
export type GetPostLikesQueryResult = Apollo.QueryResult<GetPostLikesQuery, GetPostLikesQueryVariables>;
export const GetMediaDocument = gql`
    query getMedia($where: PostWhereInput) {
  posts(where: $where) {
    images
    videos
  }
}
    `;

/**
 * __useGetMediaQuery__
 *
 * To run a query within a React component, call `useGetMediaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMediaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMediaQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetMediaQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMediaQuery, GetMediaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMediaQuery, GetMediaQueryVariables>(GetMediaDocument, options);
      }
export function useGetMediaLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMediaQuery, GetMediaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMediaQuery, GetMediaQueryVariables>(GetMediaDocument, options);
        }
export function useGetMediaSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetMediaQuery, GetMediaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMediaQuery, GetMediaQueryVariables>(GetMediaDocument, options);
        }
export type GetMediaQueryHookResult = ReturnType<typeof useGetMediaQuery>;
export type GetMediaLazyQueryHookResult = ReturnType<typeof useGetMediaLazyQuery>;
export type GetMediaSuspenseQueryHookResult = ReturnType<typeof useGetMediaSuspenseQuery>;
export type GetMediaQueryResult = Apollo.QueryResult<GetMediaQuery, GetMediaQueryVariables>;
export const LikePostDocument = gql`
    mutation likePost($data: PostLikeCreateInput!) {
  createOnePostLike(data: $data) {
    id
  }
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const DeletePostLikeDocument = gql`
    mutation deletePostLike($where: PostLikeWhereUniqueInput!) {
  deleteOnePostLike(where: $where) {
    id
  }
}
    `;
export type DeletePostLikeMutationFn = Apollo.MutationFunction<DeletePostLikeMutation, DeletePostLikeMutationVariables>;

/**
 * __useDeletePostLikeMutation__
 *
 * To run a mutation, you first call `useDeletePostLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostLikeMutation, { data, loading, error }] = useDeletePostLikeMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeletePostLikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostLikeMutation, DeletePostLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeletePostLikeMutation, DeletePostLikeMutationVariables>(DeletePostLikeDocument, options);
      }
export type DeletePostLikeMutationHookResult = ReturnType<typeof useDeletePostLikeMutation>;
export type DeletePostLikeMutationResult = Apollo.MutationResult<DeletePostLikeMutation>;
export type DeletePostLikeMutationOptions = Apollo.BaseMutationOptions<DeletePostLikeMutation, DeletePostLikeMutationVariables>;
export const ProcessVideoDocument = gql`
    mutation processVideo($data: ProcessVideoInput!) {
  processVideo(data: $data) {
    jobId
    aspectRatio
  }
}
    `;
export type ProcessVideoMutationFn = Apollo.MutationFunction<ProcessVideoMutation, ProcessVideoMutationVariables>;

/**
 * __useProcessVideoMutation__
 *
 * To run a mutation, you first call `useProcessVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProcessVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [processVideoMutation, { data, loading, error }] = useProcessVideoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProcessVideoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ProcessVideoMutation, ProcessVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ProcessVideoMutation, ProcessVideoMutationVariables>(ProcessVideoDocument, options);
      }
export type ProcessVideoMutationHookResult = ReturnType<typeof useProcessVideoMutation>;
export type ProcessVideoMutationResult = Apollo.MutationResult<ProcessVideoMutation>;
export type ProcessVideoMutationOptions = Apollo.BaseMutationOptions<ProcessVideoMutation, ProcessVideoMutationVariables>;
export const FlagPostDocument = gql`
    mutation flagPost($data: PostFlagCreateInput!) {
  createOnePostFlag(data: $data) {
    id
  }
}
    `;
export type FlagPostMutationFn = Apollo.MutationFunction<FlagPostMutation, FlagPostMutationVariables>;

/**
 * __useFlagPostMutation__
 *
 * To run a mutation, you first call `useFlagPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFlagPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [flagPostMutation, { data, loading, error }] = useFlagPostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFlagPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FlagPostMutation, FlagPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<FlagPostMutation, FlagPostMutationVariables>(FlagPostDocument, options);
      }
export type FlagPostMutationHookResult = ReturnType<typeof useFlagPostMutation>;
export type FlagPostMutationResult = Apollo.MutationResult<FlagPostMutation>;
export type FlagPostMutationOptions = Apollo.BaseMutationOptions<FlagPostMutation, FlagPostMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($where: PostWhereUniqueInput!) {
  deleteOnePost(where: $where) {
    id
    uuid
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const GetSchoolsDocument = gql`
    query getSchools($where: SchoolWhereInput, $orderBy: [SchoolOrderByWithRelationInput!], $cursor: SchoolWhereUniqueInput, $take: Int, $skip: Int) {
  schools(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    take: $take
    skip: $skip
  ) {
    ...SchoolCommonParts
  }
}
    ${SchoolCommonPartsFragmentDoc}`;

/**
 * __useGetSchoolsQuery__
 *
 * To run a query within a React component, call `useGetSchoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchoolsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetSchoolsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSchoolsQuery, GetSchoolsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSchoolsQuery, GetSchoolsQueryVariables>(GetSchoolsDocument, options);
      }
export function useGetSchoolsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSchoolsQuery, GetSchoolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSchoolsQuery, GetSchoolsQueryVariables>(GetSchoolsDocument, options);
        }
export function useGetSchoolsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetSchoolsQuery, GetSchoolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetSchoolsQuery, GetSchoolsQueryVariables>(GetSchoolsDocument, options);
        }
export type GetSchoolsQueryHookResult = ReturnType<typeof useGetSchoolsQuery>;
export type GetSchoolsLazyQueryHookResult = ReturnType<typeof useGetSchoolsLazyQuery>;
export type GetSchoolsSuspenseQueryHookResult = ReturnType<typeof useGetSchoolsSuspenseQuery>;
export type GetSchoolsQueryResult = Apollo.QueryResult<GetSchoolsQuery, GetSchoolsQueryVariables>;
export const GetSchoolDocument = gql`
    query getSchool($where: SchoolWhereUniqueInput!) {
  school(where: $where) {
    ...SchoolCommonParts
  }
}
    ${SchoolCommonPartsFragmentDoc}`;

/**
 * __useGetSchoolQuery__
 *
 * To run a query within a React component, call `useGetSchoolQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchoolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchoolQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetSchoolQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetSchoolQuery, GetSchoolQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSchoolQuery, GetSchoolQueryVariables>(GetSchoolDocument, options);
      }
export function useGetSchoolLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSchoolQuery, GetSchoolQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSchoolQuery, GetSchoolQueryVariables>(GetSchoolDocument, options);
        }
export function useGetSchoolSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetSchoolQuery, GetSchoolQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetSchoolQuery, GetSchoolQueryVariables>(GetSchoolDocument, options);
        }
export type GetSchoolQueryHookResult = ReturnType<typeof useGetSchoolQuery>;
export type GetSchoolLazyQueryHookResult = ReturnType<typeof useGetSchoolLazyQuery>;
export type GetSchoolSuspenseQueryHookResult = ReturnType<typeof useGetSchoolSuspenseQuery>;
export type GetSchoolQueryResult = Apollo.QueryResult<GetSchoolQuery, GetSchoolQueryVariables>;
export const CreateInterestDocument = gql`
    mutation createInterest($data: InterestedSchoolsCreateInput!) {
  createOneInterestedSchools(data: $data) {
    athlete {
      id
    }
  }
}
    `;
export type CreateInterestMutationFn = Apollo.MutationFunction<CreateInterestMutation, CreateInterestMutationVariables>;

/**
 * __useCreateInterestMutation__
 *
 * To run a mutation, you first call `useCreateInterestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInterestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInterestMutation, { data, loading, error }] = useCreateInterestMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateInterestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateInterestMutation, CreateInterestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateInterestMutation, CreateInterestMutationVariables>(CreateInterestDocument, options);
      }
export type CreateInterestMutationHookResult = ReturnType<typeof useCreateInterestMutation>;
export type CreateInterestMutationResult = Apollo.MutationResult<CreateInterestMutation>;
export type CreateInterestMutationOptions = Apollo.BaseMutationOptions<CreateInterestMutation, CreateInterestMutationVariables>;
export const InterestedSchoolsDocument = gql`
    query interestedSchools($where: InterestedSchoolsWhereInput, $orderBy: [InterestedSchoolsOrderByWithRelationInput!], $cursor: InterestedSchoolsWhereUniqueInput, $take: Int, $skip: Int, $distinct: [InterestedSchoolsScalarFieldEnum!]) {
  findManyInterestedSchools(
    where: $where
    orderBy: $orderBy
    take: $take
    skip: $skip
    distinct: $distinct
    cursor: $cursor
  ) {
    userId
    schoolId
    AthleteCommitment
    school {
      id
      name
      logo
    }
    athleteId
    athlete {
      id
      position {
        id
        name
      }
      skills {
        ...SkillCommonParts
      }
    }
    User {
      id
      firstname
      surname
      uuid
      username
      avatar
    }
  }
}
    ${SkillCommonPartsFragmentDoc}`;

/**
 * __useInterestedSchoolsQuery__
 *
 * To run a query within a React component, call `useInterestedSchoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInterestedSchoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInterestedSchoolsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useInterestedSchoolsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InterestedSchoolsQuery, InterestedSchoolsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<InterestedSchoolsQuery, InterestedSchoolsQueryVariables>(InterestedSchoolsDocument, options);
      }
export function useInterestedSchoolsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InterestedSchoolsQuery, InterestedSchoolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<InterestedSchoolsQuery, InterestedSchoolsQueryVariables>(InterestedSchoolsDocument, options);
        }
export function useInterestedSchoolsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<InterestedSchoolsQuery, InterestedSchoolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<InterestedSchoolsQuery, InterestedSchoolsQueryVariables>(InterestedSchoolsDocument, options);
        }
export type InterestedSchoolsQueryHookResult = ReturnType<typeof useInterestedSchoolsQuery>;
export type InterestedSchoolsLazyQueryHookResult = ReturnType<typeof useInterestedSchoolsLazyQuery>;
export type InterestedSchoolsSuspenseQueryHookResult = ReturnType<typeof useInterestedSchoolsSuspenseQuery>;
export type InterestedSchoolsQueryResult = Apollo.QueryResult<InterestedSchoolsQuery, InterestedSchoolsQueryVariables>;
export const UpdateInterestDocument = gql`
    mutation updateInterest($data: InterestedSchoolsUpdateInput!, $where: InterestedSchoolsWhereUniqueInput!) {
  updateOneInterestedSchools(data: $data, where: $where) {
    schoolId
    userId
  }
}
    `;
export type UpdateInterestMutationFn = Apollo.MutationFunction<UpdateInterestMutation, UpdateInterestMutationVariables>;

/**
 * __useUpdateInterestMutation__
 *
 * To run a mutation, you first call `useUpdateInterestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInterestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInterestMutation, { data, loading, error }] = useUpdateInterestMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateInterestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateInterestMutation, UpdateInterestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateInterestMutation, UpdateInterestMutationVariables>(UpdateInterestDocument, options);
      }
export type UpdateInterestMutationHookResult = ReturnType<typeof useUpdateInterestMutation>;
export type UpdateInterestMutationResult = Apollo.MutationResult<UpdateInterestMutation>;
export type UpdateInterestMutationOptions = Apollo.BaseMutationOptions<UpdateInterestMutation, UpdateInterestMutationVariables>;
export const UpdateInterestsDocument = gql`
    mutation updateInterests($data: InterestedSchoolsUpdateManyMutationInput!, $where: InterestedSchoolsWhereInput) {
  updateManyInterestedSchools(data: $data, where: $where) {
    count
  }
}
    `;
export type UpdateInterestsMutationFn = Apollo.MutationFunction<UpdateInterestsMutation, UpdateInterestsMutationVariables>;

/**
 * __useUpdateInterestsMutation__
 *
 * To run a mutation, you first call `useUpdateInterestsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInterestsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInterestsMutation, { data, loading, error }] = useUpdateInterestsMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateInterestsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateInterestsMutation, UpdateInterestsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateInterestsMutation, UpdateInterestsMutationVariables>(UpdateInterestsDocument, options);
      }
export type UpdateInterestsMutationHookResult = ReturnType<typeof useUpdateInterestsMutation>;
export type UpdateInterestsMutationResult = Apollo.MutationResult<UpdateInterestsMutation>;
export type UpdateInterestsMutationOptions = Apollo.BaseMutationOptions<UpdateInterestsMutation, UpdateInterestsMutationVariables>;
export const UpdateSchoolDocument = gql`
    mutation updateSchool($data: SchoolUpdateInput!, $where: SchoolWhereUniqueInput!) {
  updateOneSchool(data: $data, where: $where) {
    ...SchoolCommonParts
  }
}
    ${SchoolCommonPartsFragmentDoc}`;
export type UpdateSchoolMutationFn = Apollo.MutationFunction<UpdateSchoolMutation, UpdateSchoolMutationVariables>;

/**
 * __useUpdateSchoolMutation__
 *
 * To run a mutation, you first call `useUpdateSchoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSchoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSchoolMutation, { data, loading, error }] = useUpdateSchoolMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateSchoolMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSchoolMutation, UpdateSchoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateSchoolMutation, UpdateSchoolMutationVariables>(UpdateSchoolDocument, options);
      }
export type UpdateSchoolMutationHookResult = ReturnType<typeof useUpdateSchoolMutation>;
export type UpdateSchoolMutationResult = Apollo.MutationResult<UpdateSchoolMutation>;
export type UpdateSchoolMutationOptions = Apollo.BaseMutationOptions<UpdateSchoolMutation, UpdateSchoolMutationVariables>;
export const RecruitedAthletesDocument = gql`
    query recruitedAthletes($where: RecruitedAthleteWhereInput, $orderBy: [RecruitedAthleteOrderByWithRelationInput!], $cursor: RecruitedAthleteWhereUniqueInput, $take: Int, $skip: Int, $distinct: [RecruitedAthleteScalarFieldEnum!]) {
  recruitedAthletes(
    where: $where
    orderBy: $orderBy
    take: $take
    skip: $skip
    distinct: $distinct
    cursor: $cursor
  ) {
    athlete {
      id
      graduationYear
      position {
        name
        category {
          name
        }
      }
      skills {
        ...SkillCommonParts
      }
    }
    User {
      id
      firstname
      surname
      avatar
    }
    school {
      id
      name
      logo
    }
  }
}
    ${SkillCommonPartsFragmentDoc}`;

/**
 * __useRecruitedAthletesQuery__
 *
 * To run a query within a React component, call `useRecruitedAthletesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecruitedAthletesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecruitedAthletesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useRecruitedAthletesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecruitedAthletesQuery, RecruitedAthletesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<RecruitedAthletesQuery, RecruitedAthletesQueryVariables>(RecruitedAthletesDocument, options);
      }
export function useRecruitedAthletesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecruitedAthletesQuery, RecruitedAthletesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<RecruitedAthletesQuery, RecruitedAthletesQueryVariables>(RecruitedAthletesDocument, options);
        }
export function useRecruitedAthletesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<RecruitedAthletesQuery, RecruitedAthletesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<RecruitedAthletesQuery, RecruitedAthletesQueryVariables>(RecruitedAthletesDocument, options);
        }
export type RecruitedAthletesQueryHookResult = ReturnType<typeof useRecruitedAthletesQuery>;
export type RecruitedAthletesLazyQueryHookResult = ReturnType<typeof useRecruitedAthletesLazyQuery>;
export type RecruitedAthletesSuspenseQueryHookResult = ReturnType<typeof useRecruitedAthletesSuspenseQuery>;
export type RecruitedAthletesQueryResult = Apollo.QueryResult<RecruitedAthletesQuery, RecruitedAthletesQueryVariables>;
export const ProspectAthletesDocument = gql`
    query prospectAthletes($where: ProspectedAthleteWhereInput, $orderBy: [ProspectedAthleteOrderByWithRelationInput!], $cursor: ProspectedAthleteWhereUniqueInput, $take: Int, $skip: Int, $distinct: [ProspectedAthleteScalarFieldEnum!]) {
  prospectedAthletes(
    where: $where
    orderBy: $orderBy
    take: $take
    skip: $skip
    distinct: $distinct
    cursor: $cursor
  ) {
    athlete {
      id
      graduationYear
      position {
        name
        category {
          name
        }
      }
      skills {
        ...SkillCommonParts
      }
    }
    User {
      id
      firstname
      surname
      avatar
    }
    school {
      id
      name
      logo
    }
  }
}
    ${SkillCommonPartsFragmentDoc}`;

/**
 * __useProspectAthletesQuery__
 *
 * To run a query within a React component, call `useProspectAthletesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProspectAthletesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProspectAthletesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useProspectAthletesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProspectAthletesQuery, ProspectAthletesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProspectAthletesQuery, ProspectAthletesQueryVariables>(ProspectAthletesDocument, options);
      }
export function useProspectAthletesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProspectAthletesQuery, ProspectAthletesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProspectAthletesQuery, ProspectAthletesQueryVariables>(ProspectAthletesDocument, options);
        }
export function useProspectAthletesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ProspectAthletesQuery, ProspectAthletesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ProspectAthletesQuery, ProspectAthletesQueryVariables>(ProspectAthletesDocument, options);
        }
export type ProspectAthletesQueryHookResult = ReturnType<typeof useProspectAthletesQuery>;
export type ProspectAthletesLazyQueryHookResult = ReturnType<typeof useProspectAthletesLazyQuery>;
export type ProspectAthletesSuspenseQueryHookResult = ReturnType<typeof useProspectAthletesSuspenseQuery>;
export type ProspectAthletesQueryResult = Apollo.QueryResult<ProspectAthletesQuery, ProspectAthletesQueryVariables>;
export const CreateRecruitDocument = gql`
    mutation createRecruit($data: RecruitedAthleteCreateInput!) {
  createOneRecruitedAthlete(data: $data) {
    athleteId
    schoolId
    userId
  }
}
    `;
export type CreateRecruitMutationFn = Apollo.MutationFunction<CreateRecruitMutation, CreateRecruitMutationVariables>;

/**
 * __useCreateRecruitMutation__
 *
 * To run a mutation, you first call `useCreateRecruitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecruitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecruitMutation, { data, loading, error }] = useCreateRecruitMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRecruitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRecruitMutation, CreateRecruitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateRecruitMutation, CreateRecruitMutationVariables>(CreateRecruitDocument, options);
      }
export type CreateRecruitMutationHookResult = ReturnType<typeof useCreateRecruitMutation>;
export type CreateRecruitMutationResult = Apollo.MutationResult<CreateRecruitMutation>;
export type CreateRecruitMutationOptions = Apollo.BaseMutationOptions<CreateRecruitMutation, CreateRecruitMutationVariables>;
export const CreateProspectDocument = gql`
    mutation createProspect($data: ProspectedAthleteCreateInput!) {
  createOneProspectedAthlete(data: $data) {
    athleteId
    schoolId
    userId
  }
}
    `;
export type CreateProspectMutationFn = Apollo.MutationFunction<CreateProspectMutation, CreateProspectMutationVariables>;

/**
 * __useCreateProspectMutation__
 *
 * To run a mutation, you first call `useCreateProspectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProspectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProspectMutation, { data, loading, error }] = useCreateProspectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProspectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProspectMutation, CreateProspectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateProspectMutation, CreateProspectMutationVariables>(CreateProspectDocument, options);
      }
export type CreateProspectMutationHookResult = ReturnType<typeof useCreateProspectMutation>;
export type CreateProspectMutationResult = Apollo.MutationResult<CreateProspectMutation>;
export type CreateProspectMutationOptions = Apollo.BaseMutationOptions<CreateProspectMutation, CreateProspectMutationVariables>;
export const DeleteProspectDocument = gql`
    mutation deleteProspect($where: ProspectedAthleteWhereUniqueInput!) {
  deleteOneProspectedAthlete(where: $where) {
    athleteId
    schoolId
  }
}
    `;
export type DeleteProspectMutationFn = Apollo.MutationFunction<DeleteProspectMutation, DeleteProspectMutationVariables>;

/**
 * __useDeleteProspectMutation__
 *
 * To run a mutation, you first call `useDeleteProspectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProspectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProspectMutation, { data, loading, error }] = useDeleteProspectMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteProspectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteProspectMutation, DeleteProspectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteProspectMutation, DeleteProspectMutationVariables>(DeleteProspectDocument, options);
      }
export type DeleteProspectMutationHookResult = ReturnType<typeof useDeleteProspectMutation>;
export type DeleteProspectMutationResult = Apollo.MutationResult<DeleteProspectMutation>;
export type DeleteProspectMutationOptions = Apollo.BaseMutationOptions<DeleteProspectMutation, DeleteProspectMutationVariables>;
export const DeleteInterestDocument = gql`
    mutation deleteInterest($where: InterestedSchoolsWhereUniqueInput!) {
  deleteOneInterestedSchools(where: $where) {
    athleteId
    schoolId
  }
}
    `;
export type DeleteInterestMutationFn = Apollo.MutationFunction<DeleteInterestMutation, DeleteInterestMutationVariables>;

/**
 * __useDeleteInterestMutation__
 *
 * To run a mutation, you first call `useDeleteInterestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInterestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInterestMutation, { data, loading, error }] = useDeleteInterestMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteInterestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteInterestMutation, DeleteInterestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteInterestMutation, DeleteInterestMutationVariables>(DeleteInterestDocument, options);
      }
export type DeleteInterestMutationHookResult = ReturnType<typeof useDeleteInterestMutation>;
export type DeleteInterestMutationResult = Apollo.MutationResult<DeleteInterestMutation>;
export type DeleteInterestMutationOptions = Apollo.BaseMutationOptions<DeleteInterestMutation, DeleteInterestMutationVariables>;
export const DeleteRecruitDocument = gql`
    mutation deleteRecruit($where: RecruitedAthleteWhereUniqueInput!) {
  deleteOneRecruitedAthlete(where: $where) {
    athleteId
    schoolId
  }
}
    `;
export type DeleteRecruitMutationFn = Apollo.MutationFunction<DeleteRecruitMutation, DeleteRecruitMutationVariables>;

/**
 * __useDeleteRecruitMutation__
 *
 * To run a mutation, you first call `useDeleteRecruitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecruitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecruitMutation, { data, loading, error }] = useDeleteRecruitMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteRecruitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteRecruitMutation, DeleteRecruitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteRecruitMutation, DeleteRecruitMutationVariables>(DeleteRecruitDocument, options);
      }
export type DeleteRecruitMutationHookResult = ReturnType<typeof useDeleteRecruitMutation>;
export type DeleteRecruitMutationResult = Apollo.MutationResult<DeleteRecruitMutation>;
export type DeleteRecruitMutationOptions = Apollo.BaseMutationOptions<DeleteRecruitMutation, DeleteRecruitMutationVariables>;
export const EvaluationsDocument = gql`
    query evaluations($where: EvaluationWhereInput, $orderBy: [EvaluationOrderByWithRelationInput!], $cursor: EvaluationWhereUniqueInput, $take: Int, $skip: Int, $distinct: [EvaluationScalarFieldEnum!]) {
  evaluations(
    where: $where
    orderBy: $orderBy
    take: $take
    skip: $skip
    distinct: $distinct
    cursor: $cursor
  ) {
    evaluationType
    createdAt
    note
    images
    videos
    athleteId
    schoolId
    athlete {
      user {
        id
        firstname
        surname
        avatar
      }
    }
    createdBy {
      id
      firstname
      surname
      avatar
      coachProfile {
        title
      }
    }
  }
}
    `;

/**
 * __useEvaluationsQuery__
 *
 * To run a query within a React component, call `useEvaluationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvaluationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvaluationsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useEvaluationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvaluationsQuery, EvaluationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<EvaluationsQuery, EvaluationsQueryVariables>(EvaluationsDocument, options);
      }
export function useEvaluationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvaluationsQuery, EvaluationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<EvaluationsQuery, EvaluationsQueryVariables>(EvaluationsDocument, options);
        }
export function useEvaluationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<EvaluationsQuery, EvaluationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<EvaluationsQuery, EvaluationsQueryVariables>(EvaluationsDocument, options);
        }
export type EvaluationsQueryHookResult = ReturnType<typeof useEvaluationsQuery>;
export type EvaluationsLazyQueryHookResult = ReturnType<typeof useEvaluationsLazyQuery>;
export type EvaluationsSuspenseQueryHookResult = ReturnType<typeof useEvaluationsSuspenseQuery>;
export type EvaluationsQueryResult = Apollo.QueryResult<EvaluationsQuery, EvaluationsQueryVariables>;
export const CreateEvaluationDocument = gql`
    mutation createEvaluation($data: EvaluationCreateInput!) {
  createOneEvaluation(data: $data) {
    evaluationType
    note
    images
    videos
    athleteId
    schoolId
  }
}
    `;
export type CreateEvaluationMutationFn = Apollo.MutationFunction<CreateEvaluationMutation, CreateEvaluationMutationVariables>;

/**
 * __useCreateEvaluationMutation__
 *
 * To run a mutation, you first call `useCreateEvaluationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEvaluationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEvaluationMutation, { data, loading, error }] = useCreateEvaluationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEvaluationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEvaluationMutation, CreateEvaluationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateEvaluationMutation, CreateEvaluationMutationVariables>(CreateEvaluationDocument, options);
      }
export type CreateEvaluationMutationHookResult = ReturnType<typeof useCreateEvaluationMutation>;
export type CreateEvaluationMutationResult = Apollo.MutationResult<CreateEvaluationMutation>;
export type CreateEvaluationMutationOptions = Apollo.BaseMutationOptions<CreateEvaluationMutation, CreateEvaluationMutationVariables>;
export const GetSkillTypesDocument = gql`
    query getSkillTypes($where: SkillTypeWhereInput, $orderBy: [SkillTypeOrderByWithRelationInput!], $cursor: SkillTypeWhereUniqueInput, $take: Int, $skip: Int, $distinct: [SkillTypeScalarFieldEnum!]) {
  skillTypes(
    where: $where
    orderBy: $orderBy
    take: $take
    skip: $skip
    distinct: $distinct
    cursor: $cursor
  ) {
    name
    id
    uuid
    mask
    unit
    options
    numberOfVideos
    secondFieldName
    description
    secondValueOptions
    videosLabels
  }
}
    `;

/**
 * __useGetSkillTypesQuery__
 *
 * To run a query within a React component, call `useGetSkillTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSkillTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSkillTypesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useGetSkillTypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSkillTypesQuery, GetSkillTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSkillTypesQuery, GetSkillTypesQueryVariables>(GetSkillTypesDocument, options);
      }
export function useGetSkillTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSkillTypesQuery, GetSkillTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSkillTypesQuery, GetSkillTypesQueryVariables>(GetSkillTypesDocument, options);
        }
export function useGetSkillTypesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetSkillTypesQuery, GetSkillTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetSkillTypesQuery, GetSkillTypesQueryVariables>(GetSkillTypesDocument, options);
        }
export type GetSkillTypesQueryHookResult = ReturnType<typeof useGetSkillTypesQuery>;
export type GetSkillTypesLazyQueryHookResult = ReturnType<typeof useGetSkillTypesLazyQuery>;
export type GetSkillTypesSuspenseQueryHookResult = ReturnType<typeof useGetSkillTypesSuspenseQuery>;
export type GetSkillTypesQueryResult = Apollo.QueryResult<GetSkillTypesQuery, GetSkillTypesQueryVariables>;
export const GetSkillsDocument = gql`
    query getSkills($where: SkillsWhereInput, $orderBy: [SkillsOrderByWithRelationInput!], $cursor: SkillsWhereUniqueInput, $take: Int, $skip: Int, $distinct: [SkillsScalarFieldEnum!]) {
  findManySkills(
    where: $where
    orderBy: $orderBy
    take: $take
    skip: $skip
    distinct: $distinct
    cursor: $cursor
  ) {
    id
    videos
    secondValue
    value
    skillType {
      id
      name
      options
      numberOfVideos
      secondFieldName
      secondValueOptions
      videosLabels
    }
    athlete {
      id
    }
  }
}
    `;

/**
 * __useGetSkillsQuery__
 *
 * To run a query within a React component, call `useGetSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSkillsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useGetSkillsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSkillsQuery, GetSkillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSkillsQuery, GetSkillsQueryVariables>(GetSkillsDocument, options);
      }
export function useGetSkillsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSkillsQuery, GetSkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSkillsQuery, GetSkillsQueryVariables>(GetSkillsDocument, options);
        }
export function useGetSkillsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetSkillsQuery, GetSkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetSkillsQuery, GetSkillsQueryVariables>(GetSkillsDocument, options);
        }
export type GetSkillsQueryHookResult = ReturnType<typeof useGetSkillsQuery>;
export type GetSkillsLazyQueryHookResult = ReturnType<typeof useGetSkillsLazyQuery>;
export type GetSkillsSuspenseQueryHookResult = ReturnType<typeof useGetSkillsSuspenseQuery>;
export type GetSkillsQueryResult = Apollo.QueryResult<GetSkillsQuery, GetSkillsQueryVariables>;
export const SkillsTypesDocument = gql`
    query skillsTypes($where: SkillsWhereInput, $orderBy: [SkillTypeOrderByWithRelationInput!]) {
  skillTypes(orderBy: $orderBy) {
    id
    name
    options
    numberOfVideos
    secondFieldName
    secondValueOptions
    videosLabels
    description
    unit
    skills(where: $where) {
      id
      videos
      secondValue
      value
    }
  }
}
    `;

/**
 * __useSkillsTypesQuery__
 *
 * To run a query within a React component, call `useSkillsTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillsTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillsTypesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useSkillsTypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SkillsTypesQuery, SkillsTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SkillsTypesQuery, SkillsTypesQueryVariables>(SkillsTypesDocument, options);
      }
export function useSkillsTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SkillsTypesQuery, SkillsTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SkillsTypesQuery, SkillsTypesQueryVariables>(SkillsTypesDocument, options);
        }
export function useSkillsTypesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<SkillsTypesQuery, SkillsTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<SkillsTypesQuery, SkillsTypesQueryVariables>(SkillsTypesDocument, options);
        }
export type SkillsTypesQueryHookResult = ReturnType<typeof useSkillsTypesQuery>;
export type SkillsTypesLazyQueryHookResult = ReturnType<typeof useSkillsTypesLazyQuery>;
export type SkillsTypesSuspenseQueryHookResult = ReturnType<typeof useSkillsTypesSuspenseQuery>;
export type SkillsTypesQueryResult = Apollo.QueryResult<SkillsTypesQuery, SkillsTypesQueryVariables>;
export const CreateSkillDocument = gql`
    mutation createSkill($data: SkillsCreateInput!) {
  createOneSkills(data: $data) {
    id
    videos
    secondValue
    value
    skillType {
      id
      name
      options
      numberOfVideos
      secondFieldName
      secondValueOptions
      videosLabels
    }
  }
}
    `;
export type CreateSkillMutationFn = Apollo.MutationFunction<CreateSkillMutation, CreateSkillMutationVariables>;

/**
 * __useCreateSkillMutation__
 *
 * To run a mutation, you first call `useCreateSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSkillMutation, { data, loading, error }] = useCreateSkillMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSkillMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSkillMutation, CreateSkillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateSkillMutation, CreateSkillMutationVariables>(CreateSkillDocument, options);
      }
export type CreateSkillMutationHookResult = ReturnType<typeof useCreateSkillMutation>;
export type CreateSkillMutationResult = Apollo.MutationResult<CreateSkillMutation>;
export type CreateSkillMutationOptions = Apollo.BaseMutationOptions<CreateSkillMutation, CreateSkillMutationVariables>;
export const UpsertOneSkillDocument = gql`
    mutation upsertOneSkill($where: SkillsWhereUniqueInput!, $create: SkillsCreateInput!, $update: SkillsUpdateInput!) {
  upsertOneSkills(create: $create, where: $where, update: $update) {
    id
    videos
  }
}
    `;
export type UpsertOneSkillMutationFn = Apollo.MutationFunction<UpsertOneSkillMutation, UpsertOneSkillMutationVariables>;

/**
 * __useUpsertOneSkillMutation__
 *
 * To run a mutation, you first call `useUpsertOneSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertOneSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertOneSkillMutation, { data, loading, error }] = useUpsertOneSkillMutation({
 *   variables: {
 *      where: // value for 'where'
 *      create: // value for 'create'
 *      update: // value for 'update'
 *   },
 * });
 */
export function useUpsertOneSkillMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpsertOneSkillMutation, UpsertOneSkillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpsertOneSkillMutation, UpsertOneSkillMutationVariables>(UpsertOneSkillDocument, options);
      }
export type UpsertOneSkillMutationHookResult = ReturnType<typeof useUpsertOneSkillMutation>;
export type UpsertOneSkillMutationResult = Apollo.MutationResult<UpsertOneSkillMutation>;
export type UpsertOneSkillMutationOptions = Apollo.BaseMutationOptions<UpsertOneSkillMutation, UpsertOneSkillMutationVariables>;
export const UpdateOneSkillDocument = gql`
    mutation updateOneSkill($data: SkillsUpdateInput!, $where: SkillsWhereUniqueInput!) {
  updateOneSkills(data: $data, where: $where) {
    id
    videos
  }
}
    `;
export type UpdateOneSkillMutationFn = Apollo.MutationFunction<UpdateOneSkillMutation, UpdateOneSkillMutationVariables>;

/**
 * __useUpdateOneSkillMutation__
 *
 * To run a mutation, you first call `useUpdateOneSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneSkillMutation, { data, loading, error }] = useUpdateOneSkillMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateOneSkillMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOneSkillMutation, UpdateOneSkillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateOneSkillMutation, UpdateOneSkillMutationVariables>(UpdateOneSkillDocument, options);
      }
export type UpdateOneSkillMutationHookResult = ReturnType<typeof useUpdateOneSkillMutation>;
export type UpdateOneSkillMutationResult = Apollo.MutationResult<UpdateOneSkillMutation>;
export type UpdateOneSkillMutationOptions = Apollo.BaseMutationOptions<UpdateOneSkillMutation, UpdateOneSkillMutationVariables>;
export const GetFollowersDocument = gql`
    query getFollowers($where: FollowsWhereInput, $orderBy: [FollowsOrderByWithRelationInput!], $cursor: FollowsWhereUniqueInput, $take: Int, $skip: Int, $distinct: [FollowsScalarFieldEnum!]) {
  findManyFollows(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    take: $take
    skip: $skip
    distinct: $distinct
  ) {
    follower {
      id
      firstname
      surname
      email
      avatar
      dob
      username
      address
      _count {
        following
        followedBy
      }
      athleteProfile {
        id
        uuid
        gpa
        createdAt
        hudlLink
        recruitingContactName
        recruitingPhoneNumber
        recruitingRelationship
        playerCardUrl
        verified
        school {
          id
          name
          schoolType {
            name
            id
          }
        }
        schoolId
        transcripts {
          name
          url
          id
          uuid
        }
        position {
          name
          shortName
          id
        }
        skills {
          id
          videos
          value
          skillType {
            name
            id
            unit
            options
            numberOfVideos
            secondFieldName
            description
            secondValueOptions
          }
        }
        userId
        country {
          name
          id
          flag
          abbreviation
        }
      }
      accountType {
        id
        title
        createdAt
        role {
          id
          title
        }
      }
    }
    following {
      id
      firstname
      surname
      email
      avatar
      dob
      username
      address
      _count {
        following
        followedBy
      }
      athleteProfile {
        id
        uuid
        gpa
        createdAt
        hudlLink
        recruitingContactName
        recruitingPhoneNumber
        recruitingRelationship
        playerCardUrl
        school {
          id
          name
          schoolType {
            name
            id
          }
        }
        schoolId
        transcripts {
          name
          url
          id
          uuid
        }
        position {
          name
          shortName
          id
        }
        skills {
          id
          videos
          value
          skillType {
            name
            id
            unit
            options
            numberOfVideos
            secondFieldName
            description
            secondValueOptions
          }
        }
        userId
        country {
          name
          id
          flag
          abbreviation
        }
      }
      accountType {
        id
        title
        createdAt
        role {
          id
          title
        }
      }
    }
  }
}
    `;

/**
 * __useGetFollowersQuery__
 *
 * To run a query within a React component, call `useGetFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useGetFollowersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
      }
export function useGetFollowersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
        }
export function useGetFollowersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
        }
export type GetFollowersQueryHookResult = ReturnType<typeof useGetFollowersQuery>;
export type GetFollowersLazyQueryHookResult = ReturnType<typeof useGetFollowersLazyQuery>;
export type GetFollowersSuspenseQueryHookResult = ReturnType<typeof useGetFollowersSuspenseQuery>;
export type GetFollowersQueryResult = Apollo.QueryResult<GetFollowersQuery, GetFollowersQueryVariables>;
export const GetUserDocument = gql`
    query getUser($where: UserWhereUniqueInput!, $userId: BigInt) {
  user(where: $where) {
    ...UserCommonParts
    followedBy(where: {followerId: {equals: $userId}}) {
      followerId
      follower {
        id
        firstname
        surname
      }
    }
  }
}
    ${UserCommonPartsFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $cursor: UserWhereUniqueInput, $take: Int, $skip: Int, $distinct: [UserScalarFieldEnum!]) {
  users(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    take: $take
    skip: $skip
    distinct: $distinct
  ) {
    ...UserCommonParts
    id
    firstname
    surname
    email
    avatar
    username
    city
    state
    athleteProfile {
      country {
        name
        id
        flag
        abbreviation
      }
    }
  }
}
    ${UserCommonPartsFragmentDoc}`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetBlockedUsersDocument = gql`
    query getBlockedUsers($where: BlocksWhereInput, $orderBy: [BlocksOrderByWithRelationInput!], $cursor: BlocksWhereUniqueInput, $take: Int, $skip: Int, $distinct: [BlocksScalarFieldEnum!]) {
  findManyBlocks(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    take: $take
    skip: $skip
    distinct: $distinct
  ) {
    blocked {
      id
      firstname
      username
      surname
      avatar
      accountType {
        id
        title
      }
    }
  }
}
    `;

/**
 * __useGetBlockedUsersQuery__
 *
 * To run a query within a React component, call `useGetBlockedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlockedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlockedUsersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useGetBlockedUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>(GetBlockedUsersDocument, options);
      }
export function useGetBlockedUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>(GetBlockedUsersDocument, options);
        }
export function useGetBlockedUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>(GetBlockedUsersDocument, options);
        }
export type GetBlockedUsersQueryHookResult = ReturnType<typeof useGetBlockedUsersQuery>;
export type GetBlockedUsersLazyQueryHookResult = ReturnType<typeof useGetBlockedUsersLazyQuery>;
export type GetBlockedUsersSuspenseQueryHookResult = ReturnType<typeof useGetBlockedUsersSuspenseQuery>;
export type GetBlockedUsersQueryResult = Apollo.QueryResult<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>;
export const CreateOneUserDocument = gql`
    mutation createOneUser($data: UserCreateInput!) {
  createOneUser(data: $data) {
    ...UserCommonParts
  }
}
    ${UserCommonPartsFragmentDoc}`;
export type CreateOneUserMutationFn = Apollo.MutationFunction<CreateOneUserMutation, CreateOneUserMutationVariables>;

/**
 * __useCreateOneUserMutation__
 *
 * To run a mutation, you first call `useCreateOneUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneUserMutation, { data, loading, error }] = useCreateOneUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOneUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOneUserMutation, CreateOneUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateOneUserMutation, CreateOneUserMutationVariables>(CreateOneUserDocument, options);
      }
export type CreateOneUserMutationHookResult = ReturnType<typeof useCreateOneUserMutation>;
export type CreateOneUserMutationResult = Apollo.MutationResult<CreateOneUserMutation>;
export type CreateOneUserMutationOptions = Apollo.BaseMutationOptions<CreateOneUserMutation, CreateOneUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
  updateOneUser(where: $where, data: $data) {
    id
    firstname
    surname
    email
    avatar
    dob
    username
    address
    city
    state
    _count {
      following
      followedBy
    }
    athleteProfile {
      id
      uuid
      gpa
      createdAt
      hudlLink
      recruitingContactName
      recruitingPhoneNumber
      recruitingRelationship
      playerCardUrl
      verified
      graduationYear
      school {
        id
        name
        email
        logo
        description
        secondaryColor
        primaryColor
        description
        city
        latitude
        longitude
        radius
        address
        yearFounded
        division
        conference
        yearlyTuition
        undergradStudents
        schoolType {
          name
          id
        }
      }
      schoolId
      transcripts {
        name
        url
        id
        uuid
      }
      position {
        name
        shortName
        id
      }
      skills {
        id
        videos
        value
        skillType {
          name
          id
          unit
          options
          numberOfVideos
          secondFieldName
          description
          secondValueOptions
        }
      }
      userId
      country {
        name
        id
        flag
        abbreviation
      }
    }
    accountType {
      id
      title
      createdAt
      role {
        id
        title
      }
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const FollowUserDocument = gql`
    mutation followUser($data: FollowsCreateInput!) {
  createOneFollows(data: $data) {
    followerId
    followingId
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const BlockUserDocument = gql`
    mutation blockUser($data: BlocksCreateInput!) {
  createOneBlocks(data: $data) {
    blockedId
    blockedById
  }
}
    `;
export type BlockUserMutationFn = Apollo.MutationFunction<BlockUserMutation, BlockUserMutationVariables>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBlockUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, options);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
export const UnBlockUserDocument = gql`
    mutation unBlockUser($where: BlocksWhereUniqueInput!) {
  deleteOneBlocks(where: $where) {
    blockedId
    blockedById
  }
}
    `;
export type UnBlockUserMutationFn = Apollo.MutationFunction<UnBlockUserMutation, UnBlockUserMutationVariables>;

/**
 * __useUnBlockUserMutation__
 *
 * To run a mutation, you first call `useUnBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unBlockUserMutation, { data, loading, error }] = useUnBlockUserMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUnBlockUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnBlockUserMutation, UnBlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UnBlockUserMutation, UnBlockUserMutationVariables>(UnBlockUserDocument, options);
      }
export type UnBlockUserMutationHookResult = ReturnType<typeof useUnBlockUserMutation>;
export type UnBlockUserMutationResult = Apollo.MutationResult<UnBlockUserMutation>;
export type UnBlockUserMutationOptions = Apollo.BaseMutationOptions<UnBlockUserMutation, UnBlockUserMutationVariables>;
export const UnFollowUserDocument = gql`
    mutation unFollowUser($where: FollowsWhereUniqueInput!) {
  deleteOneFollows(where: $where) {
    followerId
    followingId
  }
}
    `;
export type UnFollowUserMutationFn = Apollo.MutationFunction<UnFollowUserMutation, UnFollowUserMutationVariables>;

/**
 * __useUnFollowUserMutation__
 *
 * To run a mutation, you first call `useUnFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unFollowUserMutation, { data, loading, error }] = useUnFollowUserMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUnFollowUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnFollowUserMutation, UnFollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UnFollowUserMutation, UnFollowUserMutationVariables>(UnFollowUserDocument, options);
      }
export type UnFollowUserMutationHookResult = ReturnType<typeof useUnFollowUserMutation>;
export type UnFollowUserMutationResult = Apollo.MutationResult<UnFollowUserMutation>;
export type UnFollowUserMutationOptions = Apollo.BaseMutationOptions<UnFollowUserMutation, UnFollowUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($where: UserWhereUniqueInput!) {
  deleteOneUser(where: $where) {
    id
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;