/*
 * Copyright 2017-present varchar.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#pragma once

#include "execution/ExecutionPlan.h"
#include "surface/DataSurface.h"
#include "surface/SchemaRow.h"

/**
 * A logic wrapper to return top sort cursors when sorting and limiting are present
 */
namespace nebula {
namespace execution {
namespace core {

// global phase will need to finalize some columns when fetching data
nebula::surface::RowCursorPtr finalize(
  nebula::surface::RowCursorPtr, const nebula::surface::Name2Index&, const FinalPhase&);

} // namespace core
} // namespace execution
} // namespace nebula