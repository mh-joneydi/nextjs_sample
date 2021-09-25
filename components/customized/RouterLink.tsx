import { Link as StyledLink, LinkProps } from "@material-ui/core";
import { FC } from "react";
import Link, { LinkProps as TNextLinkProps } from 'next/link'


type TRouterLink = LinkProps&Omit<TNextLinkProps, 'passHref'>

const RouterLink: FC<TRouterLink> = ({ 
    href,
    as,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
    ...props 
})=> {
    
    return (
        <Link  
            href={href}
            as={as}
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            prefetch={prefetch}
            locale={locale}
            passHref
        >
            <StyledLink {...props} />
        </Link>
    )
};

export default RouterLink;