import { test, expect } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import sinon from 'sinon';
import * as nextRouter from 'next/router';
import CoursePage from '../../app/stu/[courseCode]/testPage.jsx';

