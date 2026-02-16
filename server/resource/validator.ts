import { StandardSchemaV1 } from "better-auth";
import { ValidationError } from "better-call";

export async function runValidation({
  body,
  bodySchema,
  query,
  querySchema,
}: (
  | { body: any; bodySchema: StandardSchemaV1 }
  | { body?: never; bodySchema?: never }
) &
  (
    | { query: any; querySchema: StandardSchemaV1 }
    | { query?: never; querySchema?: never }
)) {
  if (bodySchema) {
    const result = await bodySchema?.['~standard'].validate(body);

    if (result?.issues) {
      const error = fromError(result.issues, "body");
      throw new ValidationError(error.message, error.issues);
    }
  }

  if (querySchema) {
    const result = await querySchema?.['~standard'].validate(query);

    if (result?.issues) {
      const error = fromError(result.issues, "query");
      throw new ValidationError(error.message, error.issues);
    }
  }
}


function fromError(
	error: readonly StandardSchemaV1.Issue[],
	validating: string,
) {
	const message = error
		.map((e) => {
			return `[${e.path?.length ? `${validating}.` + e.path.map((x) => (typeof x === "object" ? x.key : x)).join(".") : validating}] ${e.message}`;
		})
		.join("; ");

	return {
		message,
		issues: error,
	};
}