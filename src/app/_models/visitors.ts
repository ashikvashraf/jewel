// To parse this data:
//
//   import { Convert } from "./file";
//
//   const visitor = Convert.toVisitor(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Visitor {
  id?:             string;
  name?:           string;
  phone_number?:   string;
  vehicle_number?: string;
  purpose?:        string;
  date?:           Date;
  checkin_time?:   null | string;
  checkout_time?:  null | string;
  checkout_date?:  Date | null;
  checkin_date?:   Date | null;
  user?:           User;
  visitors_type?:  VisitorsType;
  created_at?:     Date;
  updated_at?:     Date;
  __typename?:     string;
}

export interface User {
  id?:            string;
  username?:      string;
  email?:         string;
  provider?:      string;
  confirmed?:     boolean;
  blocked?:       boolean | null;
  created_at?:    Date;
  updated_at?:    Date;
  employee_type?: VisitorsType;
  name?:          string;
  phone_number?:  string;
  company?:       VisitorsType;
  employee?:      null;
  employee_id?:   null;
  __typename?:    string;
}

export interface VisitorsType {
  name?:        string;
  id?:          string;
  email?:       string;
  __typename?:  Typename;
  description?: null;
}

export enum Typename {
  Company = "Company",
  EmployeeType = "EmployeeType",
  VisitorsType = "VisitorsType",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toVisitor(json: string): Visitor[] {
      return cast(JSON.parse(json), a(r("Visitor")));
  }

  public static visitorToJson(value: Visitor[]): string {
      return JSON.stringify(uncast(value, a(r("Visitor"))), null, 2);
  }
}

function invalidValue(typ: any, val: any): never {
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
      typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
      typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
  function transformPrimitive(typ: string, val: any): any {
      if (typeof typ === typeof val) return val;
      return invalidValue(typ, val);
  }

  function transformUnion(typs: any[], val: any): any {
      // val must validate against one typ in typs
      const l = typs.length;
      for (let i = 0; i < l; i++) {
          const typ = typs[i];
          try {
              return transform(val, typ, getProps);
          } catch (_) {}
      }
      return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
      if (cases.indexOf(val) !== -1) return val;
      return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
      // val must be an array with no invalid elements
      if (!Array.isArray(val)) return invalidValue("array", val);
      return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
      if (val === null) {
          return null;
      }
      const d = new Date(val);
      if (isNaN(d.valueOf())) {
          return invalidValue("Date", val);
      }
      return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
      if (val === null || typeof val !== "object" || Array.isArray(val)) {
          return invalidValue("object", val);
      }
      const result: any = {};
      Object.getOwnPropertyNames(props).forEach(key => {
          const prop = props[key];
          const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
          result[prop.key] = transform(v, prop.typ, getProps);
      });
      Object.getOwnPropertyNames(val).forEach(key => {
          if (!Object.prototype.hasOwnProperty.call(props, key)) {
              result[key] = transform(val[key], additional, getProps);
          }
      });
      return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
      if (val === null) return val;
      return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
      typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
      return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
          : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
          : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  "Visitor": o([
      { json: "id", js: "id", typ: u(undefined, "") },
      { json: "name", js: "name", typ: u(undefined, "") },
      { json: "phone_number", js: "phone_number", typ: u(undefined, "") },
      { json: "vehicle_number", js: "vehicle_number", typ: u(undefined, "") },
      { json: "purpose", js: "purpose", typ: u(undefined, "") },
      { json: "date", js: "date", typ: u(undefined, Date) },
      { json: "checkin_time", js: "checkin_time", typ: u(undefined, u(null, "")) },
      { json: "checkout_time", js: "checkout_time", typ: u(undefined, u(null, "")) },
      { json: "checkout_date", js: "checkout_date", typ: u(undefined, u(Date, null)) },
      { json: "checkin_date", js: "checkin_date", typ: u(undefined, u(Date, null)) },
      { json: "user", js: "user", typ: u(undefined, r("User")) },
      { json: "visitors_type", js: "visitors_type", typ: u(undefined, r("VisitorsType")) },
      { json: "created_at", js: "created_at", typ: u(undefined, Date) },
      { json: "updated_at", js: "updated_at", typ: u(undefined, Date) },
      { json: "__typename", js: "__typename", typ: u(undefined, "") },
  ], false),
  "User": o([
      { json: "id", js: "id", typ: u(undefined, "") },
      { json: "username", js: "username", typ: u(undefined, "") },
      { json: "email", js: "email", typ: u(undefined, "") },
      { json: "provider", js: "provider", typ: u(undefined, "") },
      { json: "confirmed", js: "confirmed", typ: u(undefined, true) },
      { json: "blocked", js: "blocked", typ: u(undefined, u(true, null)) },
      { json: "created_at", js: "created_at", typ: u(undefined, Date) },
      { json: "updated_at", js: "updated_at", typ: u(undefined, Date) },
      { json: "employee_type", js: "employee_type", typ: u(undefined, r("VisitorsType")) },
      { json: "name", js: "name", typ: u(undefined, "") },
      { json: "phone_number", js: "phone_number", typ: u(undefined, "") },
      { json: "company", js: "company", typ: u(undefined, r("VisitorsType")) },
      { json: "employee", js: "employee", typ: u(undefined, null) },
      { json: "employee_id", js: "employee_id", typ: u(undefined, null) },
      { json: "__typename", js: "__typename", typ: u(undefined, "") },
  ], false),
  "VisitorsType": o([
      { json: "name", js: "name", typ: u(undefined, "") },
      { json: "id", js: "id", typ: u(undefined, "") },
      { json: "email", js: "email", typ: u(undefined, "") },
      { json: "__typename", js: "__typename", typ: u(undefined, r("Typename")) },
      { json: "description", js: "description", typ: u(undefined, null) },
  ], false),
  "Typename": [
      "Company",
      "EmployeeType",
      "VisitorsType",
  ],
};
