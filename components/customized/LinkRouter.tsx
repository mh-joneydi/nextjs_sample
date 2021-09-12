import { Link, LinkProps } from "@material-ui/core";
import { FC } from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps, useLocation } from "react-router-dom";


const LinkRouter: FC<LinkProps&RouterLinkProps> = ({ to, replace, ...props })=> {
    const location = useLocation();
    return (
        <Link
            to={to}
            replace={ replace || to === location.pathname }
            {...props} 
            component={RouterLink} 
        />
    )
};

export default LinkRouter;