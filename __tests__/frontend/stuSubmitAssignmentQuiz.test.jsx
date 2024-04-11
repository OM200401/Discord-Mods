import { test, expect } from 'vitest';
import sinon from 'sinon';
import {cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import * as nextRouter from 'next/router';
import Assignments from '../../app/stu/[courseCode]/submitAssignment/[name]/testPageEssay';


