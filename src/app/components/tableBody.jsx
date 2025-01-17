import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { Link } from "react-router-dom";

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return get(item, columns[column].path);
    };

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>
                            {columns[column].path === "name"
                                ? <Link to={`/users/${item._id}`}>{get(item, columns[column].path)}</Link>
                                : renderContent(item, column)
                            }
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.object
};

export default TableBody;
