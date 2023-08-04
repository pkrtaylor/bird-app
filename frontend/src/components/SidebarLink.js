import Link from 'next/link'


const SidebarLink = ({ text, Icon, active, userPath }) => {
  return (
    <Link href={userPath ? userPath : "/"}>
      <div className={`text-[#d9d9d9] flex items-center justify-center
          xl:justify-start text-xl space-x-3 hoverAnimation ${active && "font-bold"}`}>
        <Icon className="h-7 text-white" />
        <span className="hidden xl:inline">{text}</span>
      </div>
    </Link>
  )
}

export default SidebarLink